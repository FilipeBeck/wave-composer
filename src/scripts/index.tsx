import React from 'react'
import ReactDOM from 'react-dom'
import { connect, Provider } from 'react-redux'
import { store, State as StoreState, Payload } from './store'
import * as actions from './actions'
import { DrawArea } from './components/DrawArea'
import { ControlPanel } from './components/ControlPanel'

/**
 * Indexador.
 */
export const Index = connect((storeState: StoreState) => {
	return {
		storeState
	}
}, dispatch => {
	return {
		onAddWave() {
			dispatch(actions.addWave())
		},
		onDeleteWave(index: number) {
			dispatch(actions.deleteWave(index))
		},
		onChangeWave(settings: Payload.WaveChangeData) {
			dispatch(actions.changeWave(settings))
		}
	}
})((props: Index.Props) => {
	return <div className={Index.displayName}>
		<DrawArea
			waves={props.storeState.waves}
		/>
		<ControlPanel
			waves={props.storeState.waves}
			onChange={(index, settings) => props.onChangeWave({ index, settings })}
			onDelete={props.onDeleteWave}
			onAdd={props.onAddWave}
		/>
	</div>
})
/* Inerência de interface `Index` */
export namespace Index {
	/**
	 * Atributos de componente `Index`.
	 */
	export interface Props {
		/** Estado do store. */
		storeState: StoreState

		/**
		 * Manipulador de adição de onda.
		 */
		onAddWave(): void

		/**
		 * Manipulador de mudança de onda.
		 * @param index Índice da onda a ser removida.
		 */
		onDeleteWave(index: number): void

		/**
		 * Manipulador de mudança de onda.
		 * @param settings Configurações de mudança.
		 */
		onChangeWave(settings: Payload.WaveChangeData): void
	}
}

Index.displayName = 'Index'

ReactDOM.render(
	<Provider store={store}>
		<Index />
	</Provider>,
	document.getElementById('root')
)