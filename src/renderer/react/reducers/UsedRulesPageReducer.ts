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
		selectedTimetableId: 0,
		toReload: false,
		ruleFormState: {
			name: "",
			description: "",
			actionId: 0,
			action: "",
			condirionId: 0,
			condition: "",
			timetableId: 0,
			timetable: "",
		}
	},
	reducers: {
		changeForm: {
			reducer: (state: any, action: any) => {
				state.editId = action.payload.editId
				state.editType = action.payload.editType
				state.isCopy = action.payload.isCopy
				state.toReload = action.payload.toReload
			},
			prepare: (editId, editType, isCopy, toReload) => {return {payload: {
				editId,
				editType,
				isCopy,
				toReload
			}}}
		},
		saveForm: {
			reducer: (state: any, action: any) => {
				state.ruleFormState = action.payload.ruleFormState
			},
			prepare: (ruleFormState) => {return {payload: {
				ruleFormState,
			}}}
		},
		clearForm: {
			reducer: (state: any, action: any) => {
				state.ruleFormState = {
					name: "",
					description: "",
					actionId: 0,
					action: "",
					condirionId: 0,
					condition: "",
					timetableId: 0,
					timetable: "",
				}
			},
			prepare: () => {return {payload: {}}}
		},
		moveToForm: {
			reducer: (state: any, action: any) => {
				state.editType = action.payload.editType
				state.toReload = action.payload.toReload
			},
			prepare: (editType, toReload) => {return {payload: {
				editType,
				toReload
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
		saveAction: {
			reducer: (state: any, action: any) => {
				state.ruleFormState.actionId = action.payload.editId
				state.ruleFormState.action = action.payload.name
			},
			prepare: (editId, name) => {return {payload: {
				editId,
				name
			}}}
		},
		saveCondition: {
			reducer: (state: any, action: any) => {
				state.ruleFormState.conditionId = action.payload.editId
				state.ruleFormState.condition = action.payload.name
			},
			prepare: (editId, name) => {return {payload: {
				editId,
				name
			}}}
		},
		saveTimetable: {
			reducer: (state: any, action: any) => {
				state.ruleFormState.timetableId = action.payload.editId
				state.ruleFormState.timetable = action.payload.name
			},
			prepare: (editId, name) => {return {payload: {
				editId,
				name
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

export const {
	changeForm,
	saveForm,
	clearForm,
	moveToForm,
	selectAction,
	selectCondition,
	selectTimetable,
	saveAction,
	saveCondition,
	saveTimetable,
	removeSelect
} = actions

export default reducer