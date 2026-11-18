import { DecisionTreeEngine } from './core/gameEngine';
import { verifyLeafBoundTheorem } from './core/theoremSolver';
import { SAMPLE_RICK_MORTY_TREE } from './data/sampleTree';
import { renderTreeSVG } from './ui/graphVisualizer';

const engine = new DecisionTreeEngine(SAMPLE_RICK_MORTY_TREE);
const boundInfo = verifyLeafBoundTheorem(SAMPLE_RICK_MORTY_TREE);

const app = document.querySelector<HTMLDivElement>('#app')!;

function render(): void {
  const snap = engine.getSnapshot();
  const v = snap.currentVertex;

  app.innerHTML = `
    <div style="font-family: system-ui, sans-serif; background:#020617; color:#f8fafc; min-height:100vh; padding:20px;">
      <header style="max-width:1200px; margin:0 auto 20px; border-bottom:1px solid #1e293b; padding-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h1 style="margin:0; font-size:1.5rem; color:#39ff14;">Paradoja Dimensional · T = (V, E, r)</h1>
          <small style="color:#94a3b8;">Matemáticas Discretas I — Motor de Decisión sobre Árboles Binarios</small>
        </div>
        <button id="btn-reset" style="background:#1e293b; color:#f8fafc; border:1px solid #475569; padding:8px 14px; border-radius:6px; cursor:pointer;">
          ↺ Reiniciar en raíz (r)
        </button>
      </header>

      <main style="max-width:1200px; margin:0 auto; display:grid; grid-template-columns: 1fr 1.1fr; gap:20px;">
        <!-- PANEL IZQUIERDO: INTERFAZ DEL JUEGO -->
        <section style="background:#0f172a; border:1px solid #334155; border-radius:10px; padding:20px; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:flex; justify-content:space-between; margin-bottom:12px; font-family:monospace; font-size:0.85rem;">
              <span style="background:#1e293b; padding:4px 8px; border-radius:4px; color:#38bdf8;">Vértice actual: ${v.id} ∈ ${v.isLeaf ? 'L (Hoja)' : 'V_I (Interno)'}</span>
              <span style="background:#1e293b; padding:4px 8px; border-radius:4px; color:#fbbf24;">S(${v.id}) = (e=${v.state.energy}, p=${v.state.hasPortalFluid})</span>
            </div>

            <h2 style="margin:0 0 10px; color:#f1f5f9;">${v.narrative.title}</h2>
            <p style="color:#cbd5e1; line-height:1.6;">${v.narrative.description}</p>
          </div>

          <div style="margin-top:24px;">
            ${
              !snap.isGameOver
                ? `
                  <div style="display:flex; flex-direction:column; gap:10px;">
                    <button id="btn-0" style="background:#1d4ed8; color:white; border:none; padding:12px; border-radius:6px; font-weight:600; cursor:pointer; text-align:left;">
                      ${v.narrative.option0Label}
                    </button>
                    <button id="btn-1" style="background:#047857; color:white; border:none; padding:12px; border-radius:6px; font-weight:600; cursor:pointer; text-align:left;">
                      ${v.narrative.option1Label}
                    </button>
                  </div>
                `
                : `
                  <div style="padding:16px; border-radius:8px; background:${snap.hasWon ? '#14532d' : '#7f1d1d'}; border:1px solid ${snap.hasWon ? '#4ade80' : '#f87171'};">
                    <strong>${snap.hasWon ? '✔ VICTORIA: W(' + v.id + ') = 1' : '✖ DERROTA: W(' + v.id + ') = 0'}</strong>
                    <p style="margin:8px 0 0; font-size:0.9rem;">Camino simple recorrido: <code>(${snap.pathHistory.join(' → ')})</code></p>
                  </div>
                `
            }
          </div>
        </section>

        <!-- PANEL DERECHO: MODELO MATEMÁTICO EN VIVO -->
        <section style="background:#0f172a; border:1px solid #334155; border-radius:10px; padding:20px;">
          <h3 style="margin:0 0 12px; font-size:1.1rem; color:#38bdf8;">Visualización Formal del Grafo y Teoremas</h3>
          
          <div id="tree-canvas" style="height:290px; margin-bottom:14px;"></div>

          <div style="background:#020617; border:1px solid #1e293b; border-radius:8px; padding:12px; font-family:monospace; font-size:0.85rem; line-height:1.6;">
            <div><strong>Camino simple P:</strong> (${snap.pathHistory.join(', ')}) | Longitud d(${v.id}) = ${snap.depth}</div>
            <div><strong>Teorema 1 (Cota de hojas):</strong> |L| = ${boundInfo.leafCount} ≤ 2<sup>${boundInfo.height}</sup> = ${boundInfo.maxTheoreticalLeaves} (${boundInfo.holds ? 'CUMPLE' : 'FALLA'})</div>
            <div><strong>Teorema 2 (Oráculo G):</strong> ¿${v.id} ∈ G? → <span style="color:${snap.canStillWin ? '#4ade80' : '#f87171'}; font-weight:bold;">${snap.canStillWin ? 'SÍ' : 'NO'}</span> (${snap.remainingWinningPaths} rutas ganadoras en T<sub>${v.id}</sub>)</div>
          </div>
        </section>
      </main>
    </div>
  `;

  const treeContainer = document.getElementById('tree-canvas')!;
  renderTreeSVG(treeContainer, SAMPLE_RICK_MORTY_TREE, v.id, snap.pathHistory);

  document.getElementById('btn-reset')?.addEventListener('click', () => {
    engine.reset();
    render();
  });

  document.getElementById('btn-0')?.addEventListener('click', () => {
    engine.makeDecision(0);
    render();
  });

  document.getElementById('btn-1')?.addEventListener('click', () => {
    engine.makeDecision(1);
    render();
  });
}

render();