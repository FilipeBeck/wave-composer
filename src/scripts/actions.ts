import { Payload } from './store'

/**
 * Adiciona uma nova onda.
 */
export function addWave(): Payload<void> {
	return {
		type: Payload.Type.ADD_WAVE,
		data: undefined
	}
}

/**
 * Remove uma onda.
 * @param index índice da onda a ser removida.
 */
export function deleteWave(index: number): Payload<number> {
	return {
		type: Payload.Type.DELETE_WAVE,
		data: index
	}
}

/**
 * Modifica as configurações de uma onda
 * @param settings Configurações da onda.
 */
export function changeWave(settings: Payload.WaveChangeData): Payload<Payload.WaveChangeData> {
	return {
		type: Payload.Type.CHANGE_WAVE_SETTINGS,
		data: settings
	}
}