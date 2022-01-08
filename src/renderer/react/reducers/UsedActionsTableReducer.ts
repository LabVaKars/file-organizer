import { createSlice } from '@reduxjs/toolkit'

const UsedActionsTableReducer = createSlice({
	name: "usedActionsTable",
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

const {actions, reducer} = UsedActionsTableReducer

export const {initTable} = actions

export default reducer