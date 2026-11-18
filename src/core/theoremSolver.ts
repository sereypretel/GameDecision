import { BinaryDecisionTree, VertexId } from './types';

/**
 * Calcula recursivamente la altura h(T_v) del subárbol enraizado en v.
 * @implements Definición 2.3 - Altura de un subárbol
 */
export function getSubtreeHeight(tree: BinaryDecisionTree, v: VertexId): number {
  const vertex = tree.vertices[v];
  if (!vertex || vertex.isLeaf) return 0;

  const [left, right] = tree.delta[v];
  return 1 + Math.max(getSubtreeHeight(tree, left), getSubtreeHeight(tree, right));
}

/**
 * Verifica el Teorema 1 (Acotamiento de escenarios terminales):
 * Para todo árbol binario de altura h, |L| <= 2^h.
 *
 * @implements Teorema 1 - Cota superior de hojas por inducción estructural
 */
export function verifyLeafBoundTheorem(tree: BinaryDecisionTree): {
  holds: boolean;
  leafCount: number;
  maxTheoreticalLeaves: number;
  height: number;
} {
  const height = getSubtreeHeight(tree, tree.root);
  const leafCount = Object.values(tree.vertices).filter((v) => v.isLeaf).length;
  const maxTheoreticalLeaves = Math.pow(2, height);

  return {
    holds: leafCount <= maxTheoreticalLeaves,
    leafCount,
    maxTheoreticalLeaves,
    height,
  };
}

/**
 * Implementa el Teorema 2 (Caracterización Recursiva de Estados Ganadores G):
 * v ∈ G  <=>  (v ∈ L ∧ W(v) = 1) ∨ (v ∈ V_I ∧ (δ(v,0) ∈ G ∨ δ(v,1) ∈ G))
 *
 * Además retorna el número exacto de caminos simples ganadores en el subárbol T_v.
 * @implements Teorema 2 - Existencia y conteo de estrategias ganadoras
 */
export function analyzeWinningSubtree(
  tree: BinaryDecisionTree,
  v: VertexId
): { isWinningState: boolean; winningPathsCount: number } {
  const vertex = tree.vertices[v];
  if (!vertex) {
    throw new Error(`Vértice '${v}' no pertenece a V.`);
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