import { createSlice } from '@reduxjs/toolkit'


const UsedFoldersPageReducer = createSlice({
	name: "usedFoldersPage",
	initialState: {
		editId: 0,
		isCopy: false,
	},
	reducers: {
		changeForm: {
			reducer: (state: any, action: any) => {
				state.editId = action.payload.editId
				state.isCopy = action.payload.isCopy
			},
			prepare: (editId, isCopy) => {return {payload: {
				editId,
				isCopy
			}}}
		}
	}
})

const {actions, reducer} = UsedFoldersPageReducer

export const {changeForm} = actions

export default reducer