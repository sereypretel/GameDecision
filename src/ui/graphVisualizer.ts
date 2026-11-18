import { BinaryDecisionTree, VertexId } from '../core/types';

interface NodeCoords {
  x: number;
  y: number;
}

/**
 * Renderiza dinámicamente el árbol binario T = (V, E, r) en SVG,
 * resaltando el camino simple recorrido desde r hasta el vértice actual v.
 */
export function renderTreeSVG(
  container: HTMLElement,
  tree: BinaryDecisionTree,
  currentId: VertexId,
  pathHistory: readonly VertexId[]
): void {
  const width = 620;
  const levelHeight = 95;
  const coords: Record<VertexId, NodeCoords> = {};
  let maxDepth = 0;

  // Asignación recursiva de coordenadas por partición de intervalo horizontal
  function computeLayout(vId: VertexId, depth: number, minX: number, maxX: number): void {
    if (depth > maxDepth) maxDepth = depth;
    const x = (minX + maxX) / 2;
    const y = 45 + depth * levelHeight;
    coords[vId] = { x, y };

    const vertex = tree.vertices[vId];
    if (!vertex.isLeaf) {
      const [left, right] = tree.delta[vId];
      computeLayout(left, depth + 1, minX, x);
      computeLayout(right, depth + 1, x, maxX);
    }
  }

  computeLayout(tree.root, 0, 20, width - 20);
  const height = Math.max(300, (maxDepth + 1) * levelHeight + 40);

  // Construir conjunto de aristas recorridas en el camino actual
  const traversedEdges = new Set<string>();
  for (let i = 0; i < pathHistory.length - 1; i++) {
    traversedEdges.add(`${pathHistory[i]}->${pathHistory[i + 1]}`);
  }

  let edgesSvg = '';
  for (const [uId, children] of Object.entries(tree.delta)) {
    const uPos = coords[uId];
    children.forEach((vId, idx) => {
      const vPos = coords[vId];
      const isTraversed = traversedEdges.has(`${uId}->${vId}`);
      const stroke = isTraversed ? '#39ff14' : '#475569';
      const strokeWidth = isTraversed ? 3.5 : 1.8;
      const midX = (uPos.x + vPos.x) / 2 + (idx === 0 ? -10 : 10);
      const midY = (uPos.y + vPos.y) / 2;

      edgesSvg += `
        <line x1="${uPos.x}" y1="${uPos.y}" x2="${vPos.x}" y2="${vPos.y}"
              stroke="${stroke}" stroke-width="${strokeWidth}" />
        <text x="${midX}" y="${midY}" fill="${isTraversed ? '#39ff14' : '#94a3b8'}"
              font-size="11" font-family="monospace" text-anchor="middle">${idx}</text>
      `;
    });
  }

  let nodesSvg = '';
  for (const [vId, pos] of Object.entries(coords)) {
    const vertex = tree.vertices[vId];
    const isCurrent = vId === currentId;
    const isVisited = pathHistory.includes(vId);

    let fill = '#1e293b';
    let stroke = '#64748b';
    if (isCurrent) {
      fill = '#065f46';
      stroke = '#39ff14';
    } else if (isVisited) {
      fill = '#1e3a8a';
      stroke = '#38bdf8';
    } else if (vertex.isLeaf) {
      fill = vertex.winValue === 1 ? '#14532d' : '#7f1d1d';
      stroke = vertex.winValue === 1 ? '#4ade80' : '#f87171';
    }

    nodesSvg += `
      <g>
        <circle cx="${pos.x}" cy="${pos.y}" r="${isCurrent ? 20 : 16}"
                fill="${fill}" stroke="${stroke}" stroke-width="${isCurrent ? 3.5 : 2}" />
        <text x="${pos.x}" y="${pos.y + 4}" fill="#f8fafc" font-size="12"
              font-weight="bold" font-family="monospace" text-anchor="middle">${vId}</text>
      </g>
    `;
  }

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" width="100%" height="100%" style="background:#0f172a; border-radius:8px; border:1px solid #334155;">
      ${edgesSvg}
      ${nodesSvg}
    </svg>
  `;
}