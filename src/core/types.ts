export type VertexId = string;
export type Decision = 0 | 1;

export interface StateVector {
  readonly energy: number;
  readonly hasPortalFluid: 0 | 1;
}

export interface NarrativeContent {
  readonly title: string;
  readonly description: string;
  readonly imageAsset?: string;
  readonly option0Label?: string;
  readonly option1Label?: string;
}

export interface Vertex {
  readonly id: VertexId;
  readonly isLeaf: boolean;
  readonly state: StateVector;
  readonly winValue?: 0 | 1;
  readonly narrative: NarrativeContent;
}

export interface BinaryDecisionTree {
  readonly root: VertexId;
  readonly vertices: Record<VertexId, Vertex>;
  readonly delta: Record<VertexId, readonly [VertexId, VertexId]>;
}