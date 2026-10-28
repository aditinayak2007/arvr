import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { createProceduralCar } from './threeCarBuilder';

/**
 * Dynamically converts procedural 3D car mesh into a genuine binary .glb Blob URL
 * Compatible with <model-viewer>, WebXR, and native AR.
 */
export function exportCarToGlbBlobUrl(bodyType = 'Sedan', colorHex = '#38bdf8', finishType = 'metallic') {
  return new Promise((resolve, reject) => {
    try {
      const { carGroup } = createProceduralCar(bodyType, colorHex, finishType);
      const exporter = new GLTFExporter();
      
      exporter.parse(
        carGroup,
        (result) => {
          if (result instanceof ArrayBuffer) {
            const blob = new Blob([result], { type: 'model/gltf-binary' });
            const url = URL.createObjectURL(blob);
            resolve(url);
          } else {
            const output = JSON.stringify(result, null, 2);
            const blob = new Blob([output], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            resolve(url);
          }
        },
        (error) => {
          console.error('GLTF export error:', error);
          reject(error);
        },
        { binary: true }
      );
    } catch (err) {
      console.error('Failed to create car GLB blob:', err);
      reject(err);
    }
  });
}
