import { createSlice } from '@reduxjs/toolkit'


const UsedConditionsPageReducer = createSlice({
	name: "openedModal",
	initialState: {
		modalShow: false
	},
	reducers: {
		showModal: {
			reducer: (state: any, action: any) => {state.modalShow = true},
			prepare: () => {return {payload: null}}
		},
		closeModal: {
			reducer: (state: any, action: any) => {state.modalShow = false},
			prepare: () => {return {payload: null}}
		}
	}
})

const {actions, reducer} = UsedConditionsPageReducer

export const {showModal, closeModal} = actions

export default reducer