import { createSlice } from '@reduxjs/toolkit'


const UsedActionsPageReducer = createSlice({
	name: "usedActionsPage",
	initialState: {
		editId: 0,
		editType: "Action",
		isCopy: false,
		selectedSourceFolderId: 0,
		selectedDestinationFolderId: 0,
		toReload: false,
		actionFormState: {
			name: "",
			description: "",
			type: "move",
			sourceId: 0,
			source: "",
			destinationId: 0,
			destination: "",
			pattern: "",
			includeSubfolders: 0
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
				state.actionFormState = action.payload.actionFormState
			},
			prepare: (actionFormState) => {return {payload: {
				actionFormState,
			}}}
		},
		clearForm: {
			reducer: (state: any, action: any) => {
				state.actionFormState = {
					name: "",
					description: "",
					type: "move",
					sourceId: 0,
					source: "",
					destinationId: 0,
					destination: "",
					pattern: "",
					includeSubfolders: 0
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
		selectSourceFolder: {
			reducer: (state: any, action: any) => {
				state.selectedSourceFolderId = action.payload.editId
			},
			prepare: (editId) => {return {payload: {
				editId
			}}}
		},
		selectDestinationFolder: {
			reducer: (state: any, action: any) => {
				state.selectedDestinationFolderId = action.payload.editId
			},
			prepare: (editId) => {return {payload: {
				editId
			}}}
		},
		saveSourceFolder: {
			reducer: (state: any, action: any) => {
				state.actionFormState.sourceId = action.payload.editId
				state.actionFormState.source = action.payload.path
			},
			prepare: (editId, path) => {return {payload: {
				editId,
				path
			}}}
		},
		saveDestinationFolder: {
			reducer: (state: any, action: any) => {
				state.actionFormState.destinationId = action.payload.editId
				state.actionFormState.destination = action.payload.path
			},
			prepare: (editId, path) => {return {payload: {
				editId,
				path
			}}}
		},
		removeSelect: {
			reducer: (state: any, action: any) => {
				state.selectedSourceFolderId = 0
				state.selectedDestinationFolderId = 0
			},
			prepare: () => {return {payload: {}}}
		}
	}
})

const {actions, reducer} = UsedActionsPageReducer

export const {
	changeForm,
	saveForm,
	clearForm,
	moveToForm,
	selectSourceFolder,
	selectDestinationFolder,
	saveSourceFolder,
	saveDestinationFolder,
	removeSelect
} = actions

export default reducer