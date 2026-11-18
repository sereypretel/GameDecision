import { BinaryDecisionTree } from '../core/types';

/**
 * Instancia completa del videojuego "Paradoja Dimensional"
 * Altura h = 4 | |V| = 23 (11 nodos internos V_I, 12 hojas L)
 * Cumple |L| = 12 <= 2^4 = 16 y W(l) = 1 <=> (e_l > 0) && (p_l === 1)
 */
export const sampleTree: BinaryDecisionTree = {
  root: 'r',
  vertices: {
    // ==================== NIVEL 0 (RAÍZ) ====================
    r: {
      id: 'r',
      isLeaf: false,
      state: { energy: 100, hasPortalFluid: 0 },
      narrative: {
        title: 'Garaje de la Dimensión C-137',
        description:
          '¡Burp! Morty, la singularidad temporal está colapsando el garaje y nos quedamos sin fluido dimensional estable. La pistola tiene 100% de carga. ¿Hacia qué coordenadas saltamos?',
        imageAsset: '/assets/garage.png',
        option0Label: 'Saltar a la Ciudadela de los Ricks',
        option1Label: 'Saltar al planeta Gazorpazorp',
      },
    },

    // ==================== NIVEL 1 ====================
    v0: {
      id: 'v0',
      isLeaf: false,
      state: { energy: 75, hasPortalFluid: 0 },
      narrative: {
        title: 'Ciudadela de los Ricks (Sector 7G)',
        description:
          'El Consejo tiene la Ciudadela en cuarentena. Gastaste 25% de energía abriendo la brecha. Necesitamos fluido puro antes de que nos detecten.',
        imageAsset: '/assets/citadel.png',
        option0Label: 'Infiltrarse en la Bóveda del Consejo',
        option1Label: 'Negociar en el Mercado Negro de Mortys',
      },
    },
    v1: {
      id: 'v1',
      isLeaf: false,
      state: { energy: 70, hasPortalFluid: 0 },
      narrative: {
        title: 'Selvas de Gazorpazorp',
        description:
          'La atmósfera ionizada drenó 30% de la pistola. Detectas lecturas de cristal líquido dimensional bajo unas ruinas antiguas.',
        imageAsset: '/assets/gazorpazorp.png',
        option0Label: 'Descender al Templo Subterráneo',
        option1Label: 'Cruzar el Desierto Ácido a toda velocidad',
      },
    },

    // ==================== NIVEL 2 ====================
    v00: {
      id: 'v00',
      isLeaf: false,
      state: { energy: 50, hasPortalFluid: 1 },
      narrative: {
        title: 'Bóveda de Alta Seguridad',
        description:
          '¡Lo lograste! Aseguraste un cartucho de fluido dimensional estable (p = 1), pero saltaron las alarmas y la energía bajó a 50%.',
        imageAsset: '/assets/vault.png',
        option0Label: 'Sobrecargar el Reactor Central para abrir portal',
        option1Label: 'Escapar por los conductos de ventilación',
      },
    },
    v01: {
      id: 'v01',
      isLeaf: false,
      state: { energy: 45, hasPortalFluid: 0 },
      narrative: {
        title: 'Callejón del Mercado Negro',
        description:
          'Un Rick contrabandista te ofrece fluido sin refinar a cambio de calibrar su sintetizador. Aún no tienes fluido estable (p = 0).',
        imageAsset: '/assets/market.png',
        option0Label: 'Refinar el fluido en el Laboratorio Clandestino',
        option1Label: 'Robar el frasco y correr hacia el puerto',
      },
    },
    v10: {
      id: 'v10',
      isLeaf: false,
      state: { energy: 40, hasPortalFluid: 1 },
      narrative: {
        title: 'Templo Subterráneo Gazorpiano',
        description:
          'Extrajiste fluido cristalino puro (p = 1) del altar. El templo empieza a derrumbarse con 40% de energía restante.',
        imageAsset: '/assets/temple.png',
        option0Label: 'Entrar a la Cámara del Núcleo Geotérmico',
        option1Label: 'Cruzar el Puente de Obsidiana Colapsado',
      },
    },
    v11: {
      id: 'v11',
      isLeaf: true,
      state: { energy: 0, hasPortalFluid: 0 },
      winValue: 0,
      narrative: {
        title: 'DERROTA: Varados en el Desierto Ácido',
        description:
          'La tormenta ácida consumió el 100% de la batería (e = 0) y nunca conseguiste fluido (p = 0). Sin energía ni portal, quedan atrapados para siempre.',
        imageAsset: '/assets/defeat_acid.png',
      },
    },

    // ==================== NIVEL 3 ====================
    v000: {
      id: 'v000',
      isLeaf: false,
      state: { energy: 30, hasPortalFluid: 1 },
      narrative: {
        title: 'Reactor Central de la Ciudadela',
        description:
          'Tienes fluido (p = 1) y 30% de energía. El reactor puede amplificar tu disparo o freír el circuito.',
        imageAsset: '/assets/reactor.png',
        option0Label: 'Acoplar la pistola al núcleo del reactor',
        option1Label: 'Ejecutar un salto de emergencia con carga propia',
      },
    },
    v001: {
      id: 'v001',
      isLeaf: false,
      state: { energy: 25, hasPortalFluid: 1 },
      narrative: {
        title: 'Conductos de Escape',
        description:
          'Llegas al hangar exterior con fluido (p = 1) y 25% de energía. Una patrulla bloquea la salida.',
        imageAsset: '/assets/ducts.png',
        option0Label: 'Disparar portal directo a la Tierra C-137',
        option1Label: 'Usar escudo electromagnético para distraerlos',
      },
    },
    v010: {
      id: 'v010',
      isLeaf: false,
      state: { energy: 20, hasPortalFluid: 1 },
      narrative: {
        title: 'Laboratorio Clandestino',
        description:
          'Lograste sintetizar fluido estable (p = 1), pero el proceso dejó la pistola en estado crítico con 20% de carga.',
        imageAsset: '/assets/lab.png',
        option0Label: 'Calibrar frecuencia mínima de retorno',
        option1Label: 'Abrir portal a máxima potencia',
      },
    },
    v011: {
      id: 'v011',
      isLeaf: true,
      state: { energy: 15, hasPortalFluid: 0 },
      winValue: 0,
      narrative: {
        title: 'DERROTA: Emboscada de la Federación Galáctica',
        description:
          'Aunque te queda 15% de energía (e > 0), el frasco robado estaba vacío (p = 0). La pistola emite chispas secas y son capturados.',
        imageAsset: '/assets/defeat_federation.png',
      },
    },
    v100: {
      id: 'v100',
      isLeaf: false,
      state: { energy: 20, hasPortalFluid: 1 },
      narrative: {
        title: 'Cámara del Núcleo Geotérmico',
        description:
          'El calor extremo amenaza la estabilidad del fluido (p = 1) con 20% de batería restante.',
        imageAsset: '/assets/core.png',
        option0Label: 'Canalizar calor térmico como batería auxiliar',
        option1Label: 'Disparar portal inmediato en medio del magma',
      },
    },
    v101: {
      id: 'v101',
      isLeaf: true,
      state: { energy: 0, hasPortalFluid: 1 },
      winValue: 0,
      narrative: {
        title: 'DERROTA: Abismo de Obsidiana',
        description:
          'Tienes el fluido perfecto (p = 1), pero al intentar estabilizar el puente la pistola cayó a 0% de carga (e = 0). El portal se cierra antes de cruzar.',
        imageAsset: '/assets/defeat_abyss.png',
      },
    },

    // ==================== NIVEL 4 (HOJAS FINALES d = 4) ====================
    v0000: {
      id: 'v0000',
      isLeaf: true,
      state: { energy: 0, hasPortalFluid: 1 },
      winValue: 0,
      narrative: {
        title: 'DERROTA: Sobrecarga del Reactor',
        description:
          'El pico de voltaje quemó la celda de energía (e = 0) pese a tener fluido (p = 1). Quedan atrapados en un bucle estático.',
        imageAsset: '/assets/defeat_overload.png',
      },
    },
    v0001: {
      id: 'v0001',
      isLeaf: true,
      state: { energy: 10, hasPortalFluid: 1 },
      winValue: 1,
      narrative: {
        title: 'VICTORIA: Retorno Calculado a C-137',
        description:
          '¡Escaparon! Aterrizas en el garaje con 10% de energía restante (e > 0) y fluido estable (p = 1). La paradoja temporal se cierra.',
        imageAsset: '/assets/victory_garage.png',
      },
    },
    v0010: {
      id: 'v0010',
      isLeaf: true,
      state: { energy: 5, hasPortalFluid: 1 },
      winValue: 1,
      narrative: {
        title: 'VICTORIA: Salto Sigiloso Exitoso',
        description:
          'El portal verde se abre justo a tiempo con 5% de batería (e > 0) y fluido intacto (p = 1). ¡Misión cumplida, Morty!',
        imageAsset: '/assets/victory_stealth.png',
      },
    },
    v0011: {
      id: 'v0011',
      isLeaf: true,
      state: { energy: 0, hasPortalFluid: 1 },
      winValue: 0,
      narrative: {
        title: 'DERROTA: Batería Agotada por el Escudo',
        description:
          'El escudo electromagnético drenó el último 25% de energía (e = 0). Con fluido (p = 1) pero sin carga, la pistola no enciende.',
        imageAsset: '/assets/defeat_shield.png',
      },
    },
    v0100: {
      id: 'v0100',
      isLeaf: true,
      state: { energy: 5, hasPortalFluid: 1 },
      winValue: 1,
      narrative: {
        title: 'VICTORIA: Optimización Energética Perfecta',
        description:
          'La calibración de baja frecuencia ahorró 5% de carga (e > 0) usando el fluido refinado (p = 1). Regresan sanos y salvos.',
        imageAsset: '/assets/victory_lab.png',
      },
    },
    v0101: {
      id: 'v0101',
      isLeaf: true,
      state: { energy: 0, hasPortalFluid: 1 },
      winValue: 0,
      narrative: {
        title: 'DERROTA: Colapso por Potencia Máxima',
        description:
          'Exigir máxima potencia con solo 20% de batería dejó el contador en e = 0 antes de estabilizar el túnel.',
        imageAsset: '/assets/defeat_power.png',
      },
    },
    v1000: {
      id: 'v1000',
      isLeaf: true,
      state: { energy: 15, hasPortalFluid: 1 },
      winValue: 1,
      narrative: {
        title: 'VICTORIA: Conversión Geotérmica Exitosa',
        description:
          'La energía térmica estabilizó la pistola en 15% (e > 0) con fluido cristalino (p = 1). ¡El portal los devuelve directo a casa!',
        imageAsset: '/assets/victory_thermal.png',
      },
    },
    v1001: {
      id: 'v1001',
      isLeaf: true,
      state: { energy: 5, hasPortalFluid: 0 },
      winValue: 0,
      narrative: {
        title: 'DERROTA: Evaporación del Fluido Dimensional',
        description:
          'Aunque quedó 5% de batería (e > 0), el calor del magma evaporó el fluido (p = 0). El portal colapsa al instante.',
        imageAsset: '/assets/defeat_magma.png',
      },
    },
  },
  delta: {
    r: ['v0', 'v1'],
    v0: ['v00', 'v01'],
    v1: ['v10', 'v11'],
    v00: ['v000', 'v001'],
    v01: ['v010', 'v011'],
    v10: ['v100', 'v101'],
    v000: ['v0000', 'v0001'],
    v001: ['v0010', 'v0011'],
    v010: ['v0100', 'v0101'],
    v100: ['v1000', 'v1001'],
  },
};
export const SAMPLE_RICK_MORTY_TREE = sampleTree;
