import { BinaryDecisionTree } from '../core/types';

/**
 * Instancia formal T = (V, E, r) de altura h = 2.
 * |V| = 7, |V_I| = 3, |L| = 4 <= 2^2.
 */
export const SAMPLE_RICK_MORTY_TREE: BinaryDecisionTree = {
  root: 'v0',
  vertices: {
    v0: {
      id: 'v0',
      isLeaf: false,
      state: { energy: 2, hasPortalFluid: 1 },
      narrative: {
        title: 'Garaje de la Dimensión C-137',
        description:
          '¡Morty, *burp*, la Ciudadela rastreó nuestra firma cuántica! La pistola de portales tiene 2 cargas. ¿A dónde saltamos?',
        imageAsset: '/assets/v0_garage.png',
        option0Label: '0: Saltar a la Dimensión Cronenberg',
        option1Label: '1: Saltar a Blips and Chitz',
      },
    },
    v1: {
      id: 'v1',
      isLeaf: false,
      state: { energy: 1, hasPortalFluid: 1 },
      narrative: {
        title: 'Dimensión Cronenberg',
        description:
          'Mala idea, Morty, está lleno de mutantes. Queda 1 carga de fluido dimensional. Decide rápido:',
        imageAsset: '/assets/v1_cronenberg.png',
        option0Label: '0: Calibrar frecuencia inversa',
        option1Label: '1: Forzar salto de emergencia',
      },
    },
    v2: {
      id: 'v2',
      isLeaf: false,
      state: { energy: 1, hasPortalFluid: 0 },
      narrative: {
        title: 'Blips and Chitz',
        description:
          'Morty se distrajo jugando Roy y derramó el fluido de portales (p_v = 0). Queda 1 unidad de energía.',
        imageAsset: '/assets/v2_arcade.png',
        option0Label: '0: Robar cristal de Kalaxian al guardia',
        option1Label: '1: Intentar abrir portal sin fluido',
      },
    },
    v3: {
      id: 'v3',
      isLeaf: true,
      state: { energy: 0, hasPortalFluid: 1 },
      winValue: 1,
      narrative: {
        title: 'Escape Exitoso (Dimensión Segura)',
        description:
          'La calibración funcionó. Cruzaron el portal justo antes del colapso.',
        imageAsset: '/assets/v3_win.png',
      },
    },
    v4: {
      id: 'v4',
      isLeaf: true,
      state: { energy: 0, hasPortalFluid: 0 },
      winValue: 0,
      narrative: {
        title: 'Atrapados en el Bucle Cronenberg',
        description:
          'La sobrecarga destruyó la pistola. Quedaron atrapados para siempre.',
        imageAsset: '/assets/v4_lose.png',
      },
    },
    v5: {
      id: 'v5',
      isLeaf: true,
      state: { energy: 0, hasPortalFluid: 1 },
      winValue: 1,
      narrative: {
        title: 'Huida Improvisada',
        description:
          'Con el cristal estabilizaron el portal y escaparon de la Federación Galáctica.',
        imageAsset: '/assets/v5_win.png',
      },
    },
    v6: {
      id: 'v6',
      isLeaf: true,
      state: { energy: 0, hasPortalFluid: 0 },
      winValue: 0,
      narrative: {
        title: 'Paradoja Espacial',
        description:
          'Abrir un portal con fluido inestable los envió a la dimensión de las sillas.',
        imageAsset: '/assets/v6_lose.png',
      },
    },
  },
  delta: {
    v0: ['v1', 'v2'],
    v1: ['v3', 'v4'],
    v2: ['v5', 'v6'],
  },
};