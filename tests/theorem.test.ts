import { describe, it, expect } from 'vitest';
import { validateBinaryDecisionTree } from '../src/core/treeValidator';
import {
  verifyLeafBoundTheorem,
  analyzeWinningSubtree,
} from '../src/core/theoremSolver';
import { DecisionTreeEngine } from '../src/core/gameEngine';
import { sampleTree } from '../src/data/sampleTree';

describe('Verificación Formal del Modelo Matemático T = (V, E, r)', () => {
  it('Cumple todos los axiomas de árbol binario con raíz (conexo, acíclico, grados válidos)', () => {
    const result = validateBinaryDecisionTree(sampleTree);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('Teorema 1: Verifica que |L| <= 2^h', () => {
    const bound = verifyLeafBoundTheorem(sampleTree);
    expect(bound.height).toBe(4);
    expect(bound.leafCount).toBe(11);
    expect(bound.maxTheoreticalLeaves).toBe(16);
    expect(bound.holds).toBe(true);
  });

  it('Teorema 2: Caracteriza correctamente el conjunto ganador G y cuenta caminos', () => {
    const rootAnalysis = analyzeWinningSubtree(sampleTree, sampleTree.root);
    expect(rootAnalysis.isWinningState).toBe(true);
    expect(rootAnalysis.winningPathsCount).toBe(4);

    // Rama de derrota directa en profundidad d = 2 (Desierto Ácido)
    const deadBranch = analyzeWinningSubtree(sampleTree, 'v11');
    expect(deadBranch.isWinningState).toBe(false);
    expect(deadBranch.winningPathsCount).toBe(0);
  });

  it('Motor de juego ejecuta transiciones válidas δ(u, a) y actualiza el camino simple', () => {
    const engine = new DecisionTreeEngine(sampleTree);
    expect(engine.getSnapshot().currentVertex.id).toBe('r');

    // Secuencia ganadora de 4 pasos: r -> v0 -> v00 -> v001 -> v0010
    engine.makeDecision(0);
    engine.makeDecision(0);
    engine.makeDecision(1);
    const finalSnapshot = engine.makeDecision(0);

    expect(finalSnapshot.currentVertex.isLeaf).toBe(true);
    expect(finalSnapshot.isGameOver).toBe(true);
    expect(finalSnapshot.hasWon).toBe(true);
    expect(finalSnapshot.pathHistory).toEqual(['r', 'v0', 'v00', 'v001', 'v0010']);
  });
});