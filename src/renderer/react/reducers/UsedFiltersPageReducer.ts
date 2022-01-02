import { createSlice } from '@reduxjs/toolkit'


const UsedFiltersPageReducer = createSlice({
	name: "usedFiltersPage",
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
		},
		selectFilter: {
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

const {actions, reducer} = UsedFiltersPageReducer

export const {changeForm} = actions

export default reducer