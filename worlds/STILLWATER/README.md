# STILLWATER

The first interactive micro-world in **WORLD IN MOTION**: a real-time Three.js/WebGL moonlit swamp prototype.

## Run locally

```bash
cd worlds/STILLWATER
npm install
npm run dev
```

Open the local Vite URL (normally `http://localhost:5173`). For a production check:

```bash
npm run build
npm run preview
```

Drag with a mouse or finger to look around. The prototype uses procedural geometry and shaders—there is no pre-rendered video.

## Architecture

- `src/scene/swamp.ts` composes the world and lily pads.
- `src/scene/water.ts` owns the animated water material and moonlight trail.
- `src/scene/fog.ts`, `moon.ts`, and `trees.ts` provide atmosphere, moon, cypress silhouettes, and moss.
- `src/boat/boat.ts` keeps the skiff isolated for future movement and interaction.
- `src/shaders/` contains GLSL entry points for the water and future fog work.
- `src/ui/hud.ts` contains the minimal cinematic overlay.
- `src/main.ts` owns renderer lifecycle, responsive sizing, and camera input.

The modular split leaves room for dynamic reflections, moving fog, clouds, audio, camera paths, and a later 9:16 presentation mode.
