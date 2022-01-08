import { createSlice } from '@reduxjs/toolkit'


const UsedRulesPageReducer = createSlice({
	name: "usedRulesPage",
	initialState: {
		editId: 0,
		prevId: 0,
		editType: "Rule",
		isCopy: false,
		selectedActionId: 0,
		selectedConditionId: 0,
		selectedTimetableId: 0
	},
	reducers: {
		changeForm: {
			reducer: (state: any, action: any) => {
				state.editId = action.payload.editId
				state.editType = action.payload.editType
				state.isCopy = action.payload.isCopy
			},
			prepare: (editId, editType, isCopy) => {return {payload: {
				editId,
				editType,
				isCopy
			}}}
		},
		selectAction: {
			reducer: (state: any, action: any) => {
				state.selectedActionId = action.payload.editId
			},
			prepare: (editId) => {return {payload: {
				editId
			}}}
		},
		selectCondition: {
			reducer: (state: any, action: any) => {
				state.selectedConditionId = action.payload.editId
			},
			prepare: (editId) => {return {payload: {
				editId
			}}}
		},
		selectTimetable: {
			reducer: (state: any, action: any) => {
				state.selectedTimetableId = action.payload.editId
			},
			prepare: (editId) => {return {payload: {
				editId
			}}}
		},
		removeSelect: {
			reducer: (state: any, action: any) => {
				state.selectedActionId = 0
				state.selectedConditionId = 0
				state.selectedTimetableId = 0
			},
			prepare: () => {return {payload: {}}}
		}
	}
})

const {actions, reducer} = UsedRulesPageReducer

export const {changeForm, selectAction, selectCondition, selectTimetable, removeSelect} = actions

export default reducer