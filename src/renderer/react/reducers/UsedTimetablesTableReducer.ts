import { createSlice } from '@reduxjs/toolkit'

const UsedTimetablesTableReducer = createSlice({
	name: "usedTimetablesTable",
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

const {actions, reducer} = UsedTimetablesTableReducer

export const {initTable} = actions

export default reducer