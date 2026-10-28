# AR DRIVE - 3D Models Directory

This folder is designated for storing 3D vehicle assets (.glb / .gltf formats) for the AR DRIVE Virtual Showroom.

## Supported Formats
- **.glb** (Binary GLTF - Recommended for WebAR and performance)
- **.gltf** + external textures/binaries
- **.usdz** (For Apple iOS Quick Look WebAR integration)

## How to Add New Vehicle Models:
1. Place your optimized 3D car model inside this directory, e.g.:
   - `/public/models/bmw-3series.glb`
   - `/public/models/mercedes-cclass.glb`
   - `/public/models/tesla-model3.glb`
   - `/public/models/audi-a4.glb`
   - `/public/models/car-demo.glb`

2. In `src/data/cars.js`, link the vehicle's `model3D` property:
   ```javascript
   {
     id: "bmw-3-series",
     brand: "BMW",
     model: "3 Series Gran Limousine",
     model3D: "/models/bmw-3series.glb",
     ...
   }
   ```

3. **Fallback Architecture**:
   AR DRIVE features an intelligent Procedural Three.js fallback engine. If a specific `.glb` file is missing or still being downloaded, the interactive 3D viewer automatically generates a high-precision procedural WebGL car mesh with dynamic paint shaders, real-time orbit controls, headlight glows, and alloy wheels.
