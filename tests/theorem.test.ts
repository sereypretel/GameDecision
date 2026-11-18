import { describe, it, expect } from 'vitest';
import { SAMPLE_RICK_MORTY_TREE } from '../src/data/sampleTree';
import { validateBinaryDecisionTree } from '../src/core/treeValidator';
import {
  verifyLeafBoundTheorem,
  analyzeWinningSubtree,
} from '../src/core/theoremSolver';
import { DecisionTreeEngine } from '../src/core/gameEngine';

describe('Verificación Formal del Modelo Matemático T = (V, E, r)', () => {
  it('Cumple todos los axiomas de árbol binario con raíz (conexo, acíclico, grados válidos)', () => {
    const result = validateBinaryDecisionTree(SAMPLE_RICK_MORTY_TREE);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.metrics).toEqual({
      totalVertices: 7,
      internalVertices: 3,
      leafVertices: 4,
      height: 2,
    });
  });

  it('Teorema 1: Verifica que |L| <= 2^h', () => {
    const bound = verifyLeafBoundTheorem(SAMPLE_RICK_MORTY_TREE);
    expect(bound.holds).toBe(true);
    expect(bound.leafCount).toBe(4);
    expect(bound.maxTheoreticalLeaves).toBe(4);
  });

  it('Teorema 2: Caracteriza correctamente el conjunto ganador G y cuenta caminos', () => {
    const rootAnalysis = analyzeWinningSubtree(SAMPLE_RICK_MORTY_TREE, 'v0');
    expect(rootAnalysis.isWinningState).toBe(true);
    expect(rootAnalysis.winningPathsCount).toBe(2); // Caminos (v0->v1->v3) y (v0->v2->v5)

    const losingLeaf = analyzeWinningSubtree(SAMPLE_RICK_MORTY_TREE, 'v4');
    expect(losingLeaf.isWinningState).toBe(false);
    expect(losingLeaf.winningPathsCount).toBe(0);
  });

  it('Motor de juego ejecuta transiciones válidas δ(u, a) y actualiza el camino simple', () => {
    const engine = new DecisionTreeEngine(SAMPLE_RICK_MORTY_TREE);
    expect(engine.getSnapshot().currentVertex.id).toBe('v0');

    const step1 = engine.makeDecision(0); // v0 -> v1
    expect(step1.currentVertex.id).toBe('v1');
    expect(step1.pathHistory).toEqual(['v0', 'v1']);
    expect(step1.remainingWinningPaths).toBe(1);

    const step2 = engine.makeDecision(0); // v1 -> v3 (Victoria)
    expect(step2.isGameOver).toBe(true);
    expect(step2.hasWon).toBe(true);
    expect(step2.pathHistory).toEqual(['v0', 'v1', 'v3']);
  });
});