import update from 'immutability-helper'
import * as c from 'tg_constants/TableTypes'


type stateType = any;
type actionType = any;

// interface ColumnInterface{
// 	name: string
// }

// interface RowInterface{
// 	id: string,
// 	isSelected: boolean
// }

// interface TableInterface<R extends RowInterface> {
// 	table: {
// 		name: string,
// 		columns: Array<ColumnInterface>,
// 		rows: Array<R>
// 	}
// }

const handlers = {
	[c.INIT_TABLE]: (state: stateType, {table}: actionType) => {
		state = update(state, {table: {$set: table}})
		return state
	},
	[c.ADD_ROW]: (state: stateType, {id}: actionType) => {
		console.log(id);
		return update(state, {table: { rows: { $push: [{
			id,
			isSelected: false
		}]}}})
	},
	[c.DELETE_ROW]: (state: stateType, {id}: actionType) => {
		let index = state.table.rows.findIndex((row : actionType) => {
			return row.id == id
		})
		return update(state, {table: {$splice: [
			[index, 1]
		]}})
	},
	[c.TOGGLE_SELECT_ROW]: (state: stateType, {id, multiSelect}: actionType) => {
		let index = state.table.rows.findIndex((row : actionType) => {
			return row.id == id
		})
		let newValue = !state.table.rows[index].isSelected
		let table
		if(!multiSelect){
			table = state.table.rows.map((p: actionType) => {
				return {...p, isSelected: false}
			})

			table[index].isSelected = newValue
		} else {
			table = state.table.slice(0)
			table[index].isSelected = newValue
		}
		return update(state, {table: {$set: table}})
	},
	// [CHANGE_NAME]: (state, {id, value}) => {
	// 	let index = state.table.findIndex((rule) => {
	// 		return rule.id == id
	// 	})
	// 	let newValue = {name: value}
	// 	return update(state, {table: {[index]: {$merge: newValue}}})
	// },
	// [c.CHANGE_BASE_URL]: (state, {id, value}) => {
	// 	let index = state.table.findIndex((rule) => {
	// 		return rule.id == id
	// 	})
	// 	let newValue = {baseUrl: value}
	// 	return update(state, {table: {[index]: {$merge: newValue}}})
	// },
	// [c.SET_ERRORS]: (state, {id, errors}) => {
	// 	let index = state.table.findIndex((rule) => {
	// 		return rule.id == id
	// 	})
	// 	return update(state, {table: {[index]: {$merge: {errors: errors}}}})
	// },
	[c.SAVE_CHANGES]: (state: stateType) => {
		return update(state, {$merge: {hasChanges: false}})
	},
	DEFAULT: (state: stateType) => state,
}

const TableFormReducer = (state: stateType, action: actionType) => {
	if(state.hasChanges == false &&
        action.type != c.TOGGLE_SELECT_ROW &&
        action.type != c.SAVE_CHANGES &&
        action.type != c.INIT_TABLE
	){
		state = update(state, {$merge: {hasChanges: true}})
	}
	let handle = handlers[action.type] || handlers.DEFAULT
	return handle(state, action)
}

export default TableFormReducer