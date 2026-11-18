import { BinaryDecisionTree, VertexId } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  metrics: {
    totalVertices: number;
    internalVertices: number;
    leafVertices: number;
    height: number;
  };
}

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

  function dfs(currentId: VertexId, depth: number, path: Set<VertexId>): void {
    if (path.has(currentId)) {
      errors.push(`Ciclo detectado en el vértice '${currentId}'. T no es un árbol.`);
      return;
    }

    const vertex = vertices[currentId];
    if (!vertex) {
      errors.push(`El vértice '${currentId}' referenciado en δ no existe en V.`);
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
        errors.push(`El nodo '${currentId}' tiene hijos idénticos.`);
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
      `El grafo no es conexo desde la raíz r: se alcanzaron ${visited.size} de ${allIds.length} vértices.`
    );
  }

  const leafCount = allIds.filter((id) => vertices[id].isLeaf).length;
  const internalCount = allIds.length - leafCount;

  return {
    isValid: errors.length === 0,
    errors,
    metrics: {
      totalVertices: allIds.length,
      internalVertices: internalCount,
      leafVertices: leafCount,
      height: maxDepth,
    },
  };
}