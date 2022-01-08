import { createSlice } from '@reduxjs/toolkit'

const SelectActionsTableReducer = createSlice({
	name: "selectActionsTable",
	initialState: [],
	reducers: {
		initTable: {
			reducer: (state: any, action: any) => state = action.payload.table,
			prepare: (table: any) => {
				return {payload: {table: table}}
			}
		},
	}
})

const {actions, reducer} = SelectActionsTableReducer

export const {initTable} = actions

export default reducer