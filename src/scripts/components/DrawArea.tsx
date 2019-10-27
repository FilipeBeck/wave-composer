import React, { useRef, useEffect, useLayoutEffect } from 'react'
import { WaveControl } from './WaveControl'

export const DrawArea: React.FC<DrawArea.Props> = props => {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useLayoutEffect(() => {
		const canvas = canvasRef.current

		if (canvas) {
			const canvasRect = canvas.getBoundingClientRect()
			canvas.width = canvasRect.width
			canvas.height = canvasRect.height
		}
	})
	
	useEffect(() => {
		const canvas = canvasRef.current

		if (canvas) {
			const context = canvas.getContext('2d')!
			const { width, height } = canvas
			
			context.clearRect(0, 0, width, height)
			context.translate(0, height / 2)
			context.moveTo(0, 0)
			context.strokeStyle = 'solid 1px black'

			for (let x = 0; x < width; x++) {
				const amplitude = props.waves.reduce((sum, wave) => (Math.sin(x * wave.hz / 4096 + wave.phase) * wave.amplitude * height / 2) + sum, 0)
				context.lineTo(x, amplitude)
			}

			context.stroke()
		}
	})

	return <div className={DrawArea.displayName}>
		<canvas ref={canvasRef}></canvas>
	</div>
}
export declare namespace DrawArea {
	export interface Props {
		waves: WaveControl.Settings[]
	}
}

DrawArea.displayName = 'DrawArea'