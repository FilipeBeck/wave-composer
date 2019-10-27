import { createStore } from 'redux'
import { DrawArea } from './components/DrawArea'
import { WaveControl } from './components/WaveControl'

/**
 * Estado da aplicação.
 */
export interface State {
	/** Ondas. */
	waves: WaveControl.Settings[]
}

/** Pixels por segundo. */
export const PIXELS_PER_SECOND = 100

/**
 * Payload das ações.
 */
export interface Payload<T> {
	/** Tipo da ação. */
	type: Payload.Type
	/** Dados da ação. */
	data: T
}
/* Inerência de `Payload`. */
export namespace Payload {
	/**
	 * Tipos de ações possíveis.
	 */
	export const enum Type {
		/** Mudar configurações de uma onda (amplitude, fase e frequência). */
		CHANGE_WAVE_SETTINGS,
		/** Adicionar onda. */
		ADD_WAVE,
		/** Remover onda. */
		DELETE_WAVE
	}

	/**
	 * Dados de mudança de onda.
	 */
	export interface WaveChangeData {
		/** Índice da onda. */
		index: number
		/** Dados da mudança. */
		settings: WaveControl.Settings
	}
}

/** Estado inicial. */
const initialState: State = {
	waves: [{
		amplitude: 0.25,
		hz: 220,
		phase: 0,
	}]
}

/**
 * Função redutora.
 * @param state Estado corrente.
 * @param action Ação causadora.
 */
function reducer(state = initialState, action: Payload<any>): State {
	switch(action.type) {
		// Mudar configurações de uma onda
		case Payload.Type.CHANGE_WAVE_SETTINGS: {
			const { index, settings } = action.data as Payload.WaveChangeData

			return {
				...state,
				waves: state.waves.map((wave, i) => i != index && wave || settings)
			}
		}
		// Adicionar onda
		case Payload.Type.ADD_WAVE: {
			return {
				...state,
				waves: [...state.waves, { ...initialState.waves[0] }]
			}
		}
		// Remover onda
		case Payload.Type.DELETE_WAVE: {
			const index = action.data as number

			return {
				...state,
				waves: state.waves.filter((wave, i) => index != i)
			}
		}
		// Sem alterações
		default:
			return state
	}
}

/** Store da aplicação. */
export const store = createStore(reducer)