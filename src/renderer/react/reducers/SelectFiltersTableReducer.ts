import { createSlice } from '@reduxjs/toolkit'

const SelectFiltersTableReducer = createSlice({
	name: "selectFiltersTable",
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

const {actions, reducer} = SelectFiltersTableReducer

export const {initTable} = actions

export default reducer