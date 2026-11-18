import {
  BinaryDecisionTree,
  Decision,
  Vertex,
  VertexId,
} from './types';
import { validateBinaryDecisionTree } from './treeValidator';
import { analyzeWinningSubtree } from './theoremSolver';

export interface GameSnapshot {
  readonly currentVertex: Vertex;
  readonly pathHistory: readonly VertexId[]; // Camino simple (v_0, v_1, ..., v_k) desde r
  readonly depth: number;                    // Longitud k del camino actual
  readonly isGameOver: boolean;
  readonly hasWon: boolean | null;           // null mientras v ∈ V_I; boolean si v ∈ L
  readonly remainingWinningPaths: number;    // Cantidad de hojas ganadoras en T_v
  readonly canStillWin: boolean;             // Evaluado mediante Teorema 2 (v ∈ G)
}

/**
 * Motor matemático de ejecución de partidas sobre T = (V, E, r).
 * Garantiza que toda jugada corresponde a una transición válida (u, δ(u, a)) ∈ E.
 */
export class DecisionTreeEngine {
  private readonly tree: BinaryDecisionTree;
  private currentId: VertexId;
  private history: VertexId[];

  constructor(tree: BinaryDecisionTree) {
    const validation = validateBinaryDecisionTree(tree);
    if (!validation.isValid) {
      throw new Error(
        `Modelo matemático inválido:\n- ${validation.errors.join('\n- ')}`
      );
    }
    this.tree = tree;
    this.currentId = tree.root;
    this.history = [tree.root];
  }

  /** Reinicia la partida al vértice raíz r */
  public reset(): GameSnapshot {
    this.currentId = this.tree.root;
    this.history = [this.tree.root];
    return this.getSnapshot();
  }

  /**
   * Ejecuta una transición discreta δ(u, a) = v.
   * @param decision a ∈ {0, 1}
   */
  public makeDecision(decision: Decision): GameSnapshot {
    const current = this.tree.vertices[this.currentId];

    if (current.isLeaf) {
      throw new Error(
        `Jugada inválida: el vértice '${this.currentId}' ∈ L es terminal y no admite transiciones.`
      );
    }

    const transitions = this.tree.delta[this.currentId];
    const nextId = transitions[decision];

    if (!nextId || !this.tree.vertices[nextId]) {
      throw new Error(
        `Transición indefinida: δ(${this.currentId}, ${decision}) no pertenece a V.`
      );
    }

    this.currentId = nextId;
    this.history.push(nextId);

    return this.getSnapshot();
  }

  /** Retorna el estado matemático y narrativo completo del instante actual */
  public getSnapshot(): GameSnapshot {
    const current = this.tree.vertices[this.currentId];
    const analysis = analyzeWinningSubtree(this.tree, this.currentId);

    return {
      currentVertex: current,
      pathHistory: [...this.history],
      depth: this.history.length - 1,
      isGameOver: current.isLeaf,
      hasWon: current.isLeaf ? current.winValue === 1 : null,
      remainingWinningPaths: analysis.winningPathsCount,
      canStillWin: analysis.isWinningState,
    };
  }
}