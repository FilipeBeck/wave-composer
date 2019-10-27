import React, { useCallback, useState, useEffect } from 'react'

/**
 * Controle de onda.
 * @param props Atributos.
 */
export const WaveControl: React.FC<WaveControl.Props> = props => {
	const [amplitude, setAmplitude] = useState('0.5')
	const [hz, setHZ] = useState('220')
	const [phase, setPhase] = useState('0')

	const onChangeHandler = useCallback((key: keyof WaveControl.Settings, value: string) => {
		props.onChange({
			...props.settings,
			[key]: value && parseFloat(value) || 0
		})
	}, [props.onChange])

	useEffect(() => {
		const { amplitude, hz, phase } = props.settings
		setAmplitude(String(amplitude))
		setHZ(String(hz))
		setPhase(String(phase))
	}, [props.settings])

	return <div className={WaveControl.displayName}>
		<label>
			<span>Amplitude</span>
			<input type="text" value={amplitude}
				onChange={event => setAmplitude(event.target.value)}
				onKeyUp={event => event.which == 13 && onChangeHandler('amplitude', amplitude)}
				onBlur={event => onChangeHandler('amplitude', amplitude)}
			/>
		</label>
		<label>
			<span>Hz</span>
			<input type="text" value={hz}
				onChange={event => setHZ(event.target.value)}
				onKeyUp={event => event.which == 13 && onChangeHandler('hz', hz)}
				onBlur={event => onChangeHandler('hz', hz)}
			/>
		</label>
		<label>
			<span>Fase</span>
			<input type="text" value={phase}
				onChange={event => setPhase(event.target.value)}
				onKeyUp={event => event.which == 13 && onChangeHandler('phase', phase)}
				onBlur={event => onChangeHandler('phase', phase)}
			/>
		</label>
		<button onClick={props.onDelete}>Remover</button>
	</div>
}
export declare namespace WaveControl {
	/**
	 * Atributos.
	 */
	export interface Props {
		/** Configurações da onda. */
		settings: Settings
		/** Manipulador de mudanças. */
		onChange(settings: Settings): void
		/** Remover onda. */
		onDelete(): void
	}

	/**
	 * Onda.
	 */
	export interface Settings {
		/** Volume.  */
		amplitude: number
		/** Frequência. */
		hz: number
		/** Fase. */
		phase: number
	}
}

WaveControl.displayName = 'WaveControl'