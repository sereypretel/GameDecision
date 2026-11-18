import { BinaryDecisionTree, VertexId } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  metrics: {
    totalVertices: number; // |V|
    internalVertices: number; // |V_I|
    leafVertices: number; // |L|
    height: number; // h(T)
  };
}

/**
 * Verifica computacionalmente que la estructura T = (V, E, r) cumple los axiomas
 * de un árbol binario con raíz finito, conexo y acíclico.
 *
 * @implements Definición 2.1 - Axiomas de Árbol Binario de Decisión
 */
export function validateBinaryDecisionTree(tree: BinaryDecisionTree): ValidationResult {
  const errors: string[] = [];
  const { root, vertices, delta } = tree;

  if (!vertices[root]) {
    return {
      isValid: false,
      errors: [`La raíz r='${root}' no pertenece al conjunto V.`],
      metrics: { totalVertices: 0, internalVertices: 0, leafVertices: 0, height: 0 },
    };
  }

  const visited = new Set<VertexId>();
  let maxDepth = 0;

  // Recorrido DFS para verificar aciclicidad, conexidad desde r y validez de hojas/internos
  function dfs(currentId: VertexId, depth: number, path: Set<VertexId>): void {
    if (path.has(currentId)) {
      errors.push(`Ciclo detectado en el vértice '${currentId}'. T no es un árbol.`); return; }  const vertex = vertices[currentId]; if (!vertex) { errors.push(`El vértice '${currentId}' referenciado en δ no existe en V.`);
      return;
    }

    visited.add(currentId);
    if (depth > maxDepth) maxDepth = depth;

    const transitions = delta[currentId];

    if (vertex.isLeaf) {
      if (transitions !== undefined) {
        errors.push(`El vértice hoja '${currentId}' ∈ L no puede tener transiciones en δ.`);
      }
      if (vertex.winValue !== 0 && vertex.winValue !== 1) {
        errors.push(`El vértice hoja '${currentId}' ∈ L carece de evaluación W(v) ∈ {0, 1}.`);
      }
    } else {
      if (!transitions || transitions.length !== 2) {
        errors.push(`El nodo interno '${currentId}' ∈ V_I debe tener exactamente 2 hijos en δ.`);
        return;
      }
      const [leftChild, rightChild] = transitions;
      if (leftChild === rightChild) {
        errors.push(`El nodo '${currentId}' tiene hijos idénticos (viola inyectividad local).`);
      }

      const nextPath = new Set(path);
      nextPath.add(currentId);
      dfs(leftChild, depth + 1, nextPath);
      dfs(rightChild, depth + 1, nextPath);
    }
  }

  dfs(root, 0, new Set<VertexId>());

  const allIds = Object.keys(vertices);
  if (visited.size !== allIds.length) {
    errors.push(
      `El grafo no es conexo desde la raíz r: se alcanzaron ${visited.size} de ${allIds.length} vértices.` ); }  const leafCount = allIds.filter((id) => vertices[id].isLeaf).length; const internalCount = allIds.length - leafCount;  return { isValid: errors.length === 0, errors, metrics: { totalVertices: allIds.length, internalVertices: internalCount, leafVertices: leafCount, height: maxDepth, }, }; } ```  **3. `src/core/theoremSolver.ts`** *(Implementación directa de los dos teoremas que vas a demostrar en el documento)*: ```typescript import { BinaryDecisionTree, VertexId } from './types';  /** * Calcula recursivamente la altura h(T_v) del subárbol enraizado en v. * @implements Definición 2.3 - Altura de un subárbol */ export function getSubtreeHeight(tree: BinaryDecisionTree, v: VertexId): number { const vertex = tree.vertices[v]; if (!vertex \vert{}\vert{} vertex.isLeaf) return 0;  const [left, right] = tree.delta[v]; return 1 + Math.max(getSubtreeHeight(tree, left), getSubtreeHeight(tree, right)); }  /** * Verifica el Teorema 1 (Acotamiento de escenarios terminales): * Para todo árbol binario de altura h, \vert{}L\vert{} <= 2^h. * * @implements Teorema 1 - Cota superior de hojas por inducción estructural */ export function verifyLeafBoundTheorem(tree: BinaryDecisionTree): { holds: boolean; leafCount: number; maxTheoreticalLeaves: number; height: number; } { const height = getSubtreeHeight(tree, tree.root); const leafCount = Object.values(tree.vertices).filter((v) => v.isLeaf).length; const maxTheoreticalLeaves = Math.pow(2, height);  return { holds: leafCount <= maxTheoreticalLeaves, leafCount, maxTheoreticalLeaves, height, }; }  /** * Implementa el Teorema 2 (Caracterización Recursiva de Estados Ganadores G): * v ∈ G  <=>  (v ∈ L ∧ W(v) = 1) ∨ (v ∈ V_I ∧ (δ(v,0) ∈ G ∨ δ(v,1) ∈ G)) * * Además retorna el número exacto de caminos simples ganadores en el subárbol T_v. * @implements Teorema 2 - Existencia y conteo de estrategias ganadoras */ export function analyzeWinningSubtree( tree: BinaryDecisionTree, v: VertexId ): { isWinningState: boolean; winningPathsCount: number } { const vertex = tree.vertices[v]; if (!vertex) { throw new Error(`Vértice '${v}' no pertenece a V.`);
  }

  // Caso base: v ∈ L
  if (vertex.isLeaf) {
    const wins = vertex.winValue === 1;
    return {
      isWinningState: wins,
      winningPathsCount: wins ? 1 : 0,
    };
  }

  // Paso inductivo: v ∈ V_I
  const [leftChild, rightChild] = tree.delta[v];
  const leftResult = analyzeWinningSubtree(tree, leftChild);
  const rightResult = analyzeWinningSubtree(tree, rightChild);

  return {
    isWinningState: leftResult.isWinningState || rightResult.isWinningState,
    winningPathsCount: leftResult.winningPathsCount + rightResult.winningPathsCount,
  };
}