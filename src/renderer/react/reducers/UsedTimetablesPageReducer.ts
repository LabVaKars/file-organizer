import { createSlice } from '@reduxjs/toolkit'


const UsedTimetablesPageReducer = createSlice({
	name: "usedTimetablesPage",
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

const {actions, reducer} = UsedTimetablesPageReducer

export const {changeForm} = actions

export default reducer