import { createSlice } from '@reduxjs/toolkit'


const UsedActionsPageReducer = createSlice({
	name: "usedActionsPage",
	initialState: {
		editId: 0,
		prevId: 0,
		editType: "Action",
		isCopy: false,
		selectedSourceFolderId: 0,
		selectedDestinationFolderId: 0
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

export const {changeForm, selectSourceFolder, selectDestinationFolder, removeSelect} = actions

export default reducer