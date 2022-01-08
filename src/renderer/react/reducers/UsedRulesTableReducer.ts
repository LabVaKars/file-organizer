import { createSlice } from '@reduxjs/toolkit'

const UsedRulesTableReducer = createSlice({
	name: "usedRulesTable",
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

const {actions, reducer} = UsedRulesTableReducer

export const {initTable} = actions

export default reducer