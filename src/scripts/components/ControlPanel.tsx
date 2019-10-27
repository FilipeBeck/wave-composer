import React from 'react'
import { WaveControl } from './WaveControl'

export const ControlPanel: React.FC<ControlPanel.Props> = props => {
	return <div className={ControlPanel.displayName}>
		<div>
			{props.waves.map((wave, index) => (
				<WaveControl
					key={index}
					settings={wave}
					onChange={settings => props.onChange(index, settings)}
					onDelete={() => props.onDelete(index)}
				/>
			))}
		</div>
		<div>
			<button onClick={props.onAdd}>Adicionar</button>
		</div>
	</div>
}
export declare namespace ControlPanel {
	export interface Props {
		waves: WaveControl.Settings[]
		onChange(index: number, settings: WaveControl.Settings): void
		onDelete(index: number): void
		onAdd(): void
	}
}

ControlPanel.displayName = 'ControlPanel'