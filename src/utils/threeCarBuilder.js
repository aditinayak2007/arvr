import * as THREE from 'three';

/**
 * Creates a high-fidelity procedural 3D vehicle group in Three.js
 * Supports multiple body archetypes: 'Sports', 'Sedan', 'SUV', 'Electric'
 *
 * @param {string} bodyType - Type of vehicle body ('Sedan', 'SUV', 'Sports', 'Electric')
 * @param {string} paintColorHex - Primary paint hex color (e.g. '#dc2626')
 * @param {string} finishType - 'metallic', 'gloss', 'matte'
 * @returns {{ carGroup: THREE.Group, paintMaterials: THREE.Material[], headlightMesh: THREE.Mesh }}
 */
export function createProceduralCar(bodyType = 'Sedan', paintColorHex = '#38bdf8', finishType = 'metallic') {
  const carGroup = new THREE.Group();
  carGroup.name = 'CarRoot';

  // Paint Material
  let roughness = 0.2;
  let metalness = 0.85;
  let clearcoat = 1.0;
  let clearcoatRoughness = 0.1;

  if (finishType === 'matte') {
    roughness = 0.7;
    metalness = 0.3;
    clearcoat = 0.1;
  } else if (finishType === 'gloss') {
    roughness = 0.1;
    metalness = 0.4;
    clearcoat = 1.0;
  }

  const bodyPaintMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(paintColorHex),
    metalness: metalness,
    roughness: roughness,
    clearcoat: clearcoat,
    clearcoatRoughness: clearcoatRoughness,
    reflectivity: 0.9,
  });

  const paintMaterials = [bodyPaintMaterial];

  // Common materials
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x0c131f,
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.65,
    transparent: true,
    opacity: 0.85,
    ior: 1.5,
  });

  const chromeMaterial = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.95,
    roughness: 0.1,
  });

  const blackTrimMaterial = new THREE.MeshStandardMaterial({
    color: 0x111622,
    metalness: 0.4,
    roughness: 0.6,
  });

  const tireMaterial = new THREE.MeshStandardMaterial({
    color: 0x1c1e24,
    roughness: 0.9,
    metalness: 0.1,
  });

  const rimMaterial = new THREE.MeshStandardMaterial({
    color: 0xd1d5db,
    metalness: 0.9,
    roughness: 0.2,
  });

  const brakeCaliperMaterial = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    metalness: 0.6,
    roughness: 0.3,
  });

  const headlightMaterial = new THREE.MeshStandardMaterial({
    color: 0xe0f2fe,
    emissive: 0x38bdf8,
    emissiveIntensity: 2.2,
    roughness: 0.2,
  });

  const taillightMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    emissive: 0xff1111,
    emissiveIntensity: 1.8,
    roughness: 0.2,
  });

  // Archetype body sizing
  const isSUV = bodyType === 'SUV';
  const isSports = bodyType === 'Sports' || bodyType === 'Electric';
  
  const bodyLength = isSports ? 4.4 : isSUV ? 4.6 : 4.5;
  const bodyWidth = isSUV ? 2.1 : 1.95;
  const bodyHeight = isSUV ? 1.0 : isSports ? 0.6 : 0.75;
  const cabinHeight = isSUV ? 0.75 : isSports ? 0.5 : 0.6;
  const wheelY = 0.35;
  const chassisY = wheelY + (isSUV ? 0.35 : 0.2);

  // --- 1. Lower Chassis / Main Body ---
  const bodyGeo = new THREE.BoxGeometry(bodyWidth, bodyHeight, bodyLength);
  // Round corners slightly using modifier or composite shapes
  const mainBody = new THREE.Mesh(bodyGeo, bodyPaintMaterial);
  mainBody.position.set(0, chassisY + bodyHeight / 2, 0);
  mainBody.castShadow = true;
  mainBody.receiveShadow = true;
  carGroup.add(mainBody);

  // --- 2. Aerodynamic Hood & Front Bumper ---
  const hoodLength = bodyLength * 0.32;
  const hoodGeo = new THREE.BoxGeometry(bodyWidth * 0.96, bodyHeight * 0.45, hoodLength);
  const hood = new THREE.Mesh(hoodGeo, bodyPaintMaterial);
  hood.position.set(0, chassisY + bodyHeight * 0.7, bodyLength * 0.32);
  hood.rotation.x = 0.08;
  hood.castShadow = true;
  carGroup.add(hood);

  // Front Splitter / Under-bumper
  const splitterGeo = new THREE.BoxGeometry(bodyWidth * 1.02, 0.08, 0.4);
  const splitter = new THREE.Mesh(splitterGeo, blackTrimMaterial);
  splitter.position.set(0, chassisY - 0.05, bodyLength / 2 + 0.1);
  carGroup.add(splitter);

  // --- 3. Cabin / Greenhouse Roof ---
  const cabinWidth = bodyWidth * 0.82;
  const cabinLength = bodyLength * 0.48;
  const cabinGeo = new THREE.BoxGeometry(cabinWidth, cabinHeight, cabinLength);
  const cabin = new THREE.Mesh(cabinGeo, bodyPaintMaterial);
  const cabinZ = isSUV ? -0.15 : -0.1;
  cabin.position.set(0, chassisY + bodyHeight + cabinHeight / 2 - 0.05, cabinZ);
  cabin.castShadow = true;
  carGroup.add(cabin);

  // Windshield (Front)
  const windshieldGeo = new THREE.BoxGeometry(cabinWidth * 0.95, cabinHeight * 0.85, 0.1);
  const windshield = new THREE.Mesh(windshieldGeo, glassMaterial);
  windshield.position.set(0, chassisY + bodyHeight + cabinHeight * 0.45, cabinZ + cabinLength / 2 - 0.05);
  windshield.rotation.x = isSports ? 0.5 : 0.38;
  carGroup.add(windshield);

  // Rear Windshield
  const rearGlassGeo = new THREE.BoxGeometry(cabinWidth * 0.94, cabinHeight * 0.8, 0.1);
  const rearGlass = new THREE.Mesh(rearGlassGeo, glassMaterial);
  rearGlass.position.set(0, chassisY + bodyHeight + cabinHeight * 0.45, cabinZ - cabinLength / 2 + 0.05);
  rearGlass.rotation.x = isSUV ? -0.15 : -0.42;
  carGroup.add(rearGlass);

  // Side Windows (Left & Right)
  const sideGlassGeo = new THREE.BoxGeometry(0.08, cabinHeight * 0.75, cabinLength * 0.85);
  const leftSideGlass = new THREE.Mesh(sideGlassGeo, glassMaterial);
  leftSideGlass.position.set(-cabinWidth / 2 - 0.01, chassisY + bodyHeight + cabinHeight * 0.4, cabinZ);
  carGroup.add(leftSideGlass);

  const rightSideGlass = new THREE.Mesh(sideGlassGeo, glassMaterial);
  rightSideGlass.position.set(cabinWidth / 2 + 0.01, chassisY + bodyHeight + cabinHeight * 0.4, cabinZ);
  carGroup.add(rightSideGlass);

  // Panoramic Glass Roof
  const roofGlassGeo = new THREE.BoxGeometry(cabinWidth * 0.75, 0.04, cabinLength * 0.7);
  const roofGlass = new THREE.Mesh(roofGlassGeo, glassMaterial);
  roofGlass.position.set(0, chassisY + bodyHeight + cabinHeight - 0.02, cabinZ);
  carGroup.add(roofGlass);

  // --- 4. Headlights & DRL LED Strips ---
  const headlightWidth = bodyWidth * 0.26;
  const headlightHeight = 0.09;
  const hlGeo = new THREE.BoxGeometry(headlightWidth, headlightHeight, 0.15);
  
  const leftHeadlight = new THREE.Mesh(hlGeo, headlightMaterial);
  leftHeadlight.position.set(-bodyWidth * 0.34, chassisY + bodyHeight * 0.75, bodyLength / 2 + 0.02);
  leftHeadlight.rotation.y = 0.12;
  carGroup.add(leftHeadlight);

  const rightHeadlight = new THREE.Mesh(hlGeo, headlightMaterial);
  rightHeadlight.position.set(bodyWidth * 0.34, chassisY + bodyHeight * 0.75, bodyLength / 2 + 0.02);
  rightHeadlight.rotation.y = -0.12;
  carGroup.add(rightHeadlight);

  // Front Center Grille / Electric Aero Shield
  const grilleGeo = new THREE.BoxGeometry(bodyWidth * 0.38, bodyHeight * 0.38, 0.1);
  const grille = new THREE.Mesh(grilleGeo, bodyType === 'Electric' ? bodyPaintMaterial : blackTrimMaterial);
  grille.position.set(0, chassisY + bodyHeight * 0.5, bodyLength / 2 + 0.02);
  carGroup.add(grille);

  // AR DRIVE Emblem on Hood
  const emblemGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.03, 16);
  const emblem = new THREE.Mesh(emblemGeo, chromeMaterial);
  emblem.rotation.x = Math.PI / 2;
  emblem.position.set(0, chassisY + bodyHeight * 0.88, bodyLength * 0.45);
  carGroup.add(emblem);

  // --- 5. Taillights & Rear Diffuser ---
  const tlGeo = new THREE.BoxGeometry(bodyWidth * 0.88, 0.06, 0.1);
  const taillight = new THREE.Mesh(tlGeo, taillightMaterial);
  taillight.position.set(0, chassisY + bodyHeight * 0.8, -bodyLength / 2 - 0.02);
  carGroup.add(taillight);

  // Rear Diffuser
  const diffuserGeo = new THREE.BoxGeometry(bodyWidth * 0.92, 0.18, 0.3);
  const diffuser = new THREE.Mesh(diffuserGeo, blackTrimMaterial);
  diffuser.position.set(0, chassisY + 0.05, -bodyLength / 2 - 0.05);
  carGroup.add(diffuser);

  // --- 6. Side Mirrors ---
  const mirrorGeo = new THREE.BoxGeometry(0.25, 0.12, 0.14);
  const leftMirror = new THREE.Mesh(mirrorGeo, bodyPaintMaterial);
  leftMirror.position.set(-cabinWidth / 2 - 0.18, chassisY + bodyHeight + 0.15, cabinZ + cabinLength * 0.35);
  carGroup.add(leftMirror);

  const rightMirror = new THREE.Mesh(mirrorGeo, bodyPaintMaterial);
  rightMirror.position.set(cabinWidth / 2 + 0.18, chassisY + bodyHeight + 0.15, cabinZ + cabinLength * 0.35);
  carGroup.add(rightMirror);

  // --- 7. Wheels & Rims (4 wheels) ---
  const wheelRadius = isSUV ? 0.42 : 0.36;
  const wheelWidth = 0.28;
  const trackWidth = bodyWidth * 0.98;
  const wheelbaseFrontZ = bodyLength * 0.32;
  const wheelbaseRearZ = -bodyLength * 0.32;

  const tireGeo = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelWidth, 24);
  const rimGeo = new THREE.CylinderGeometry(wheelRadius * 0.72, wheelRadius * 0.72, wheelWidth + 0.01, 16);
  const caliperGeo = new THREE.BoxGeometry(0.12, 0.15, 0.08);

  const wheelPositions = [
    { x: -trackWidth / 2, y: wheelRadius, z: wheelbaseFrontZ },
    { x: trackWidth / 2, y: wheelRadius, z: wheelbaseFrontZ },
    { x: -trackWidth / 2, y: wheelRadius, z: wheelbaseRearZ },
    { x: trackWidth / 2, y: wheelRadius, z: wheelbaseRearZ },
  ];

  wheelPositions.forEach((pos, idx) => {
    const wheelGroup = new THREE.Group();
    wheelGroup.position.set(pos.x, pos.y, pos.z);

    // Tire
    const tire = new THREE.Mesh(tireGeo, tireMaterial);
    tire.rotation.z = Math.PI / 2;
    tire.castShadow = true;
    wheelGroup.add(tire);

    // Rim
    const rim = new THREE.Mesh(rimGeo, rimMaterial);
    rim.rotation.z = Math.PI / 2;
    wheelGroup.add(rim);

    // Brake caliper
    const caliper = new THREE.Mesh(caliperGeo, brakeCaliperMaterial);
    caliper.position.set(pos.x > 0 ? -0.05 : 0.05, 0.15, 0);
    wheelGroup.add(caliper);

    carGroup.add(wheelGroup);
  });

  // --- 8. Underbody Ground Ambient Shadow Plane ---
  const shadowGeo = new THREE.PlaneGeometry(bodyWidth * 1.3, bodyLength * 1.25);
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
  const shadowMaterial = new THREE.MeshBasicMaterial({
    map: shadowTexture,
    transparent: true,
    opacity: 0.75,
    depthWrite: false,
  });

  const groundShadow = new THREE.Mesh(shadowGeo, shadowMaterial);
  groundShadow.rotation.x = -Math.PI / 2;
  groundShadow.position.y = 0.02;
  carGroup.add(groundShadow);

  return {
    carGroup,
    paintMaterials,
    headlightMesh: leftHeadlight,
    taillightMesh: taillight,
    setPaintColor: (hex) => {
      bodyPaintMaterial.color.set(hex);
    },
    setFinish: (type) => {
      if (type === 'matte') {
        bodyPaintMaterial.roughness = 0.7;
        bodyPaintMaterial.metalness = 0.25;
        bodyPaintMaterial.clearcoat = 0.1;
      } else if (type === 'gloss') {
        bodyPaintMaterial.roughness = 0.08;
        bodyPaintMaterial.metalness = 0.35;
        bodyPaintMaterial.clearcoat = 1.0;
      } else {
        // Metallic
        bodyPaintMaterial.roughness = 0.2;
        bodyPaintMaterial.metalness = 0.85;
        bodyPaintMaterial.clearcoat = 1.0;
      }
    }
  };
}
