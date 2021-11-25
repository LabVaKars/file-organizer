// import update from 'immutability-helper'
// import * as R from 'ramda'
import { createAction, createReducer} from '@reduxjs/toolkit'

// import * as c from 'tg_constants/TableConsts'
// import * as a from 'tg_actions/TableActions'
// import * as tt from 'tg_types/TableTypes'

	// let initialState = {
	// 	table: {
	// 		name: null,
	// 		columns: [],
	// 		rows: []
	// 	}
	// }

export const initTable = createAction("table/init", (table: any) => {
	return {payload: {table}}
});
export const addRow = createAction("table/addRow", (id: any) => {
	return {payload: {id}}
});

// const StateRowsReducer2 = createReducer([],(builder) => {
// 	builder
// 		.addCase(initStateRows, (state: any, action: any) => {
// 			state = action.payload,
// 		})
// 		.addDefaultCase((state: any, _action: any) => {
// 			console.log(_action)
// 			state = state
// 		})
// })

// const StateRowsReducer = createSlice({
// 	name: "stateRows",
// 	initialState: [],
// 	reducers: {
// 		init: {
// 			reducer: (state: any, action: any) => {
// 				state = action.payload.stateRows;
// 			},
// 			prepare: (stateRows: any) => {
// 				return {payload: {stateRows}}
// 			}
// 		}
// 	}
// })

// const StateRowsReducer = createReducer(
// 	[], (builder) => {
// 	builder
// 		.addCase(addRow, (state: any, action: any) => {
// 			state.push({
// 				id: action.payload.id,
// 				isSelected: false
// 			});
// 		})
// 		.addDefaultCase((state: any, _action: any) => {
// 			console.log("Default action")
// 			state = state
// 		})
// })

// const DataRowsReducer = createReducer(
// 	[], (builder) => {
// 	builder
// 		.addCase(addRow, (state: any, action: any) => {
// 			state.push({
// 				id: action.payload.id,
// 				name: "test"
// 			});
// 		})
// 		.addDefaultCase((state: any, _action: any) => {
// 			console.log("Default action")
// 			state = state
// 		})
// })

const TableFormReducer = createReducer({
	table: {
		name: null,
		columns: [],
		rows: []
	}
}, (builder) => {
	builder
		.addDefaultCase((state: any, _action: any) => {
			console.log("Default action")

			state = state
		})
})

// const TableFormReducer = createSlice({
// 	name: "table",
// 	initialState: {
// 		table: {
// 			name: null,
// 			columns: [],
// 			stateRows: [],
// 			dataRows: []
// 		}
// 	},
// 	reducers: {
// 		initTable: {
// 			reducer: (state: any, action: any) => {
// 				console.log(action)
// 				state.table = action.payload.table;
// 			},
// 			prepare: (table: tt.TableProps) => {
// 				return {payload: {table}}
// 			}
// 		},
// 		addRow: {
// 			reducer: (state: any, action: any) => {
// 				state.table.rows.push({
// 					id: action.payload.id,
// 					name: "test"
// 				});
// 			},
// 			prepare: (id: number) => {
// 				return {payload: {id}}
// 			}
// 		}
// 	}
// })

export default TableFormReducer