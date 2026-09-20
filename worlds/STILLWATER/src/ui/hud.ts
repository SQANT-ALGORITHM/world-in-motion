import * as THREE from 'three';

export function createHud(): HTMLElement {
  const hud = document.createElement('div');
  hud.className = 'hud';
  hud.innerHTML = '<span class="eyebrow">WORLD IN MOTION</span><h1>STILLWATER</h1><p>drag to drift · touch to look</p>';
  return hud;
}

export function installHudStyles(): void {
  const style = document.createElement('style');
  style.textContent = `
    :root { color-scheme: dark; font-family: Georgia, serif; }
    * { box-sizing: border-box; } html, body, #app { margin: 0; width: 100%; height: 100%; overflow: hidden; background: #061016; }
    canvas { display: block; touch-action: none; }
    .hud { position: fixed; left: clamp(20px, 5vw, 70px); bottom: clamp(22px, 7vh, 70px); color: #c1d5d0; pointer-events: none; text-shadow: 0 2px 16px #000; }
    h1 { margin: 5px 0 8px; font-size: clamp(2rem, 6vw, 5rem); font-weight: 400; letter-spacing: .12em; }
    p, .eyebrow { margin: 0; font: 10px/1.5 ui-monospace, monospace; letter-spacing: .2em; text-transform: uppercase; opacity: .7; }
  `;
  document.head.appendChild(style);
}
