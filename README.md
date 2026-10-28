# AR DRIVE — AR-Based Virtual Car Showroom

> **Academic Final-Year / College AR-VR Engineering Project**  
> **Student / Author:** Aditi Nayak (Engineering Student)  
> **Domain:** Augmented Reality / Virtual Reality & WebGL Computer Graphics  
> **Local URL:** `http://localhost:5173/`  
> **Mobile Network URL (Same Wi-Fi):** `http://192.168.1.107:5173/`  
> **Public Worldwide HTTPS URL:** `https://ar-drive-90166.loca.lt` *(Password: `202.12.83.57`)*

---

### 📱 Opening on Multiple Mobile Devices Concurrently
- **Option 1 (Local Wi-Fi Network):** Connect any number of mobile phones to the same Wi-Fi and open `http://192.168.1.107:5173/` or scan the QR code from the navigation bar.
- **Option 2 (Public Cloud HTTPS):** If devices are on different networks, cellular data (4G/5G), or college Wi-Fi with client isolation, open `https://ar-drive-90166.loca.lt` on any phone anywhere worldwide.
- **Option 3 (On-Screen Multi-Device Simulator):** Click the **"Multi-Device Preview"** floating button at the bottom-right of the screen to simulate Apple iPhone 16 Pro, Samsung Galaxy S24 Ultra, and Tablet viewports side-by-side with live synchronized interactivity!

## 🏎️ Project Overview

**AR DRIVE** is an immersive, responsive web application engineered to demonstrate how **Augmented Reality (AR)**, **3D Computer Graphics (WebGL/Three.js)**, and **interactive web technologies** can transform the traditional automotive purchasing process.

Moving beyond 2D static vehicle photos, AR DRIVE empowers prospective buyers to:
1. **Explore:** Discover multi-brand vehicle lineups (sedans, SUVs, electric cars, sports coupes) with instant live filtering and search.
2. **Inspect in 3D:** Orbit around vehicles in full 360°, switch camera presets (Front 3/4, Side Profile, Rear View, Top Down, Interior POV), inspect wireframes, and toggle studio lighting.
3. **Customize:** Dynamically mutate PBR (Physically-Based Rendering) paint shader materials (Obsidian Black, Pearl White, Metallic Silver, Racing Red, Ocean Blue, Forest Green, Cyber Gold) across Metallic, Gloss, and Matte finishes.
4. **Experience in AR:** Project true 1:1 scale vehicles onto real-world driveways, parking spaces, or table surfaces using browser **WebAR** (WebXR, Apple AR Quick Look, Google Scene Viewer) or the built-in **AR Camera Simulator** for desktop presentations.
5. **Compare:** Evaluate up to 3 vehicles side-by-side with clear visual performance metrics, torque, range, dimensions, and safety ratings.
6. **Finance & Calculate:** Real-time mathematical compound-interest loan amortization & EMI calculator with visual principal vs. interest breakdown.
7. **Engage:** Save favorites to browser `localStorage` and request virtual test drives with instant client validation and celebration feedback.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, Vite 8 |
| **3D Graphics & Shaders** | Three.js (WebGL PBR physical materials, directional rigs, contact shadow maps) |
| **WebAR Engine** | `@google/model-viewer`, WebXR Device API, Apple Quick Look (USDZ), Google Scene Viewer |
| **Camera Simulation** | HTML5 `navigator.mediaDevices.getUserMedia` + SLAM tracking reticle |
| **Styling & Design System** | Tailwind CSS v4, Glassmorphism, Custom Automotive Dark Palette |
| **Iconography** | Lucide React |
| **Data & State Management** | React Hooks, HTML5 LocalStorage persistence |
| **Celebration FX** | Canvas Confetti |

---

## 🚀 Quick Start Guide

### 1. Installation
Clone or navigate to the project directory:
```bash
cd ar-drive
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 🎓 Evaluator & Presentation Guide

For college evaluations, project reviews, and viva presentations:

1. **🎓 Guided Project Demo Button:**  
   Click the **"Project Demo"** button in the navigation bar. This opens a guided walkthrough explaining the 7 core pillars of the project along with their academic and computer graphics concepts (e.g., PBR Shaders, SLAM Plane Tracking, Matrix Comparison, and Loan Amortization).

2. **ℹ️ Floating Project Info Button:**  
   Click the floating badge at the bottom-right of the screen for project metadata, domain specifications, and technology breakdown.

3. **AR Demo Mode (For Desktop / Laptop Presentations):**  
   Since laptop webcams cannot scan the floor directly, click **"Launch AR Demo Mode (Camera HUD)"** on the AR Experience page. This opens the live AR camera viewport with real-time surface detection crosshairs, ground plane tracking, car placement, rotation, scaling (Tabletop vs 1:1 Life Size), and snapshot capture.

4. **WebAR on Smartphones:**  
   Click **"Scan QR with Smartphone"** on desktop to scan the QR code and test native WebXR / AR Quick Look on iOS and Android devices.

---

## 📁 3D Models Directory Structure

3D model files (`.glb` / `.gltf` / `.usdz`) should be placed in:
```
/public/models/
├── bmw-3series.glb
├── bmw-x5.glb
├── tesla-model3.glb
├── mercedes-cclass.glb
└── README.md
```

### Procedural Fallback Engine
If an external `.glb` file is not present or is still loading, AR DRIVE uses its built-in **Procedural Three.js Vehicle Engine** (`src/utils/threeCarBuilder.js`). It generates high-fidelity sports, sedan, SUV, and electric vehicle meshes with alloy rims, rubber tires, LED light beams, tinted glass, and customizable physical paint materials in real time.

---

## 📄 License & Academic Note
Created by **Aditi Nayak** as an academic project demonstrating Augmented Reality and WebGL 3D visualization for next-generation automobile showrooms. All car model names, brands, and technical metrics are representative demonstration data.
