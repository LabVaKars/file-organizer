import { createSlice, current} from '@reduxjs/toolkit'
import { v4 as uuidv4} from 'uuid'

const UsedConditionsTableReducer = createSlice({
	name: "usedConditionsTable",
	initialState: [],
	reducers: {
		initTable: {
			reducer: (state: any, action: any) => state = action.payload.table,
			prepare: (table: any) => {
				return {payload: {table: table}}
			}
		},
		addRow: {
			reducer: (state: any, action: any) => {
				const {name, path} = action.payload
                console.log(current(state))
				state.push({
					id: action.payload.id,
					name: name,
                    path: path
				});
			},
			prepare: ({name, path}) => {
				return {payload: {
					id: uuidv4(),
					name, path
				}}
			}
		},
		editRow: {
			reducer: (state: any, action: any) => {
				const {id, name, path} = action.payload
				const index = state.map((arr:any) => arr.id).indexOf(id)
				state[index].name = name
				state[index].path = path
			},
			prepare: ({id, name, path}) => {
				return {payload: {
					id, name, path
				}}
			}
		}
	}
})

const {actions, reducer} = UsedConditionsTableReducer

export const {addRow, editRow, initTable} = actions

export default reducer