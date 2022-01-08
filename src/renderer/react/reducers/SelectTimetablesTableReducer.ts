import { createSlice } from '@reduxjs/toolkit'

const SelectTimetablesTableReducer = createSlice({
	name: "selectTimetablesTable",
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

const {actions, reducer} = SelectTimetablesTableReducer

export const {initTable} = actions

export default reducer