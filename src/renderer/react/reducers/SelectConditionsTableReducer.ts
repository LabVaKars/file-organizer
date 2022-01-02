import { createSlice } from '@reduxjs/toolkit'

const SelectConditionsTableReducer = createSlice({
	name: "selectConditionsTable",
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

const {actions, reducer} = SelectConditionsTableReducer

export const {initTable} = actions

export default reducer