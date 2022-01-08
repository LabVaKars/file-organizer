import { createSlice } from '@reduxjs/toolkit'

const SelectFoldersTableReducer = createSlice({
	name: "selectFoldersTable",
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

const {actions, reducer} = SelectFoldersTableReducer

export const {initTable} = actions

export default reducer