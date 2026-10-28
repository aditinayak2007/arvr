import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { createProceduralCar } from './threeCarBuilder';
import { resolveAssetUrl } from './assetHelper';

let sharedDracoLoader = null;
function getDracoLoader() {
  if (!sharedDracoLoader) {
    sharedDracoLoader = new DRACOLoader();
    sharedDracoLoader.setDecoderPath(resolveAssetUrl('draco/gltf/'));
  }
  return sharedDracoLoader;
}

/**
 * Loads a real luxury sports car 3D model, centers it, and configures metallic body paint materials.
 * Gracefully falls back to procedural car generator if model is unavailable.
 */
export function loadRealisticCarModel(modelPath = 'models/sports-car.glb', colorHex = '#dc2626', finishType = 'metallic') {
  return new Promise((resolve) => {
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(getDracoLoader());

    const targetUrl = resolveAssetUrl(modelPath);
    gltfLoader.load(
      targetUrl,
      (gltf) => {
        const carRoot = new THREE.Group();
        carRoot.name = 'RealisticCar';

        const carScene = gltf.scene;

        // Compute bounding box to normalize scale and ground position
        const box = new THREE.Box3().setFromObject(carScene);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Center on X and Z, place wheels exactly on Y = 0
        carScene.position.x = -center.x;
        carScene.position.y = -box.min.y;
        carScene.position.z = -center.z;

        // Target length ~ 4.6 meters in world units
        const maxDim = Math.max(size.x, size.z);
        if (maxDim > 0) {
          const scaleFactor = 4.6 / maxDim;
          carScene.scale.set(scaleFactor, scaleFactor, scaleFactor);
          carScene.position.x *= scaleFactor;
          carScene.position.y *= scaleFactor;
          carScene.position.z *= scaleFactor;
        }

        const bodyMaterials = [];

        // Realistic PBR Paint Material
        const paintColor = new THREE.Color(colorHex);
        const carPaintMaterial = new THREE.MeshPhysicalMaterial({
          color: paintColor,
          metalness: finishType === 'matte' ? 0.3 : 0.85,
          roughness: finishType === 'matte' ? 0.6 : finishType === 'gloss' ? 0.1 : 0.2,
          clearcoat: finishType === 'matte' ? 0.1 : 1.0,
          clearcoatRoughness: 0.1,
          reflectivity: 0.9,
        });

        // Traverse meshes to identify body panels and apply shadows
        carScene.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            const name = (child.name || '').toLowerCase();
            const matName = (child.material?.name || '').toLowerCase();

            // Identify body paint meshes
            if (
              name.includes('body') ||
              name.includes('paint') ||
              name.includes('hood') ||
              name.includes('door') ||
              matName.includes('body') ||
              matName.includes('paint') ||
              matName.includes('car_paint') ||
              matName.includes('red')
            ) {
              child.material = carPaintMaterial.clone();
              bodyMaterials.push(child.material);
            }
          }
        });

        // If no explicit body mesh was matched, use the largest meshes
        if (bodyMaterials.length === 0) {
          carScene.traverse((child) => {
            if (child.isMesh && child.geometry) {
              const count = child.geometry.attributes.position?.count || 0;
              if (count > 2000 && !child.name.toLowerCase().includes('glass') && !child.name.toLowerCase().includes('wheel')) {
                child.material = carPaintMaterial;
                bodyMaterials.push(child.material);
              }
            }
          });
        }

        carRoot.add(carScene);

        // Add soft ambient underbody contact shadow
        const shadowGeo = new THREE.PlaneGeometry(2.4, 5.0);
        const shadowCanvas = document.createElement('canvas');
        shadowCanvas.width = 256;
        shadowCanvas.height = 256;
        const ctx = shadowCanvas.getContext('2d');
        const gradient = ctx.createRadialGradient(128, 128, 20, 128, 128, 120);
        gradient.addColorStop(0, 'rgba(0,0,0,0.85)');
        gradient.addColorStop(0.6, 'rgba(0,0,0,0.4)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);

        const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
        const shadowMat = new THREE.MeshBasicMaterial({
          map: shadowTexture,
          transparent: true,
          opacity: 0.8,
          depthWrite: false,
        });

        const groundShadow = new THREE.Mesh(shadowGeo, shadowMat);
        groundShadow.rotation.x = -Math.PI / 2;
        groundShadow.position.y = 0.02;
        carRoot.add(groundShadow);

        resolve({
          carGroup: carRoot,
          setPaintColor: (newHex) => {
            bodyMaterials.forEach((m) => m.color.set(newHex));
          },
          setFinish: (type) => {
            bodyMaterials.forEach((m) => {
              if (type === 'matte') {
                m.roughness = 0.65;
                m.metalness = 0.3;
                m.clearcoat = 0.1;
              } else if (type === 'gloss') {
                m.roughness = 0.08;
                m.metalness = 0.4;
                m.clearcoat = 1.0;
              } else {
                m.roughness = 0.2;
                m.metalness = 0.85;
                m.clearcoat = 1.0;
              }
            });
          }
        });
      },
      undefined,
      (err) => {
        console.warn('Real GLB load failed for', modelPath, err);
        if (!modelPath.includes('sports-car.glb')) {
          loadRealisticCarModel('models/sports-car.glb', colorHex, finishType).then(resolve);
          return;
        }
        const fallback = createProceduralCar('Sports', colorHex, finishType);
        resolve(fallback);
      }
    );
  });
}
