// import update from 'immutability-helper'
// import * as R from 'ramda'
import { createSlice, current} from '@reduxjs/toolkit'

// import * as c from 'tg_constants/TableConsts'
// import * as a from 'tg_actions/TableActions'
// import * as tt from 'tg_types/TableTypes'




const FavouriteFolderTableReducer = createSlice({
	name: "favFolderTable",
	initialState: [],
	reducers: {
		initTable: {
			reducer: (_state: any, action: any) => action.payload.table,
			prepare: (table: any) => {
				return {payload: {table}}
			}
		},
		addRow: {
			reducer: (state: any, _action: any) => {
                console.log(current(state))
				state.push({
					name: "test",
                    path: "D:/Test"
				});
			},
			prepare: (id: number) => {
				return {payload: {id}}
			}
		}
	}
})

const {actions, reducer} = FavouriteFolderTableReducer

export const {addRow, initTable} = actions

export default reducer