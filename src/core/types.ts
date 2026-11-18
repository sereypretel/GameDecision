/**
 * @fileoverview Definiciones formales del modelo matemático discreto.
 * Modelo: Árbol Binario de Decisión con Estados T = (V, E, r)
 */

/** Elemento v ∈ V (Conjunto finito de vértices/escenarios) */
export type VertexId = string;

/** Alfabeto binario de decisión Σ = {0, 1} (0: Izquierda, 1: Derecha) */
export type Decision = 0 | 1;

/**
 * Vector de estado S(v) = (e_v, p_v) ∈ ℕ × {0, 1}
 * - energy: energía restante de la pistola de portales (e_v)
 * - hasPortalFluid: proposición atómica p_v (1 si posee fluido estable, 0 si no)
 */
export interface StateVector {
  readonly energy: number;
  readonly hasPortalFluid: 0 | 1;
}

/** Metadatos de presentación (desacoplados del motor matemático) */
export interface NarrativeMetadata {
  readonly title: string;
  readonly description: string;
  readonly imageAsset: string;
  readonly option0Label?: string;
  readonly option1Label?: string;
}

/**
 * Definición de un vértice v ∈ V.
 * V se particiona en V_I (nodos internos, isLeaf = false) y L (hojas, isLeaf = true).
 */
export interface Vertex {
  readonly id: VertexId;
  readonly isLeaf: boolean;
  readonly state: StateVector;
  /** Función de evaluación terminal W: L -> {0, 1} (definida solo si v ∈ L) */
  readonly winValue?: 0 | 1;
  readonly narrative: NarrativeMetadata;
}

/**
 * Estructura formal del Árbol Binario de Decisión T = (V, E, r)
 */
export interface BinaryDecisionTree {
  /** Vértice raíz r ∈ V_I */
  readonly root: VertexId;
  /** Conjunto total de vértices V = V_I ∪ L */
  readonly vertices: Record<VertexId, Vertex>;
  /**
   * Función de transición parcial δ: V_I × {0, 1} -> V
   * Define el conjunto de aristas dirigidas E = { (u, δ(u, a)) | u ∈ V_I, a ∈ {0, 1} }
   */
  readonly delta: Record<VertexId, readonly [VertexId, VertexId]>;
}