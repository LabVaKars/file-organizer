import { createSlice } from '@reduxjs/toolkit'


const UsedConditionsPageReducer = createSlice({
	name: "usedConditionsPage",
	initialState: {
		editId: 0,
		prevId: 0,
		isCopy: false,
		editType: "Condition",
		formName: "",
		formLabel: "",
		selectedFilterId: 0,
		selectedSubCondId: 0
	},
	reducers: {
		changeForm: {
			reducer: (state: any, action: any) => {
				state.prevId = action.payload.prevId
				state.editId = action.payload.editId
				state.editType = action.payload.editType
				state.isCopy = action.payload.isCopy
				if(state.editType == 'Condition'){
					state.formName = "editConditionForm"
					state.formLabel = "Condition Form"
				} else if(state.editType == 'Filter'){
					state.formName = "editFilterForm"
					state.formLabel = "Filter Form"
				}
			},
			prepare: (editId, prevId, editType, isCopy) => {return {payload: {
				editId,
				prevId,
				editType,
				isCopy
			}}}
		},
		selectFilter: {
			reducer: (state: any, action: any) => {
				state.selectedFilterId = action.payload.editId
			},
			prepare: (editId) => {return {payload: {
				editId
			}}}
		},
		selectSubCond: {
			reducer: (state: any, action: any) => {
				state.selectedSubCondId = action.payload.editId
			},
			prepare: (editId) => {return {payload: {
				editId
			}}}
		},
		removeSelect: {
			reducer: (state: any, action: any) => {
				state.selectedFilterId = 0
				state.selectedSubCondId = 0
			},
			prepare: () => {return {payload: {}}}
		}
	}
})

const {actions, reducer} = UsedConditionsPageReducer

export const {changeForm, selectFilter, selectSubCond, removeSelect} = actions

export default reducer