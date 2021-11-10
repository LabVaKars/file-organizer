import update from 'immutability-helper'
import { INIT_TESTS, ADD_TEST, DELETE_TEST, TOGGLE_SELECT_TEST, CHANGE_NAME, CHANGE_DESCRIPTION, SAVE_CHANGES, MOVE_TEST, SET_ERRORS } from 'tg_constants/Test.types'


const handlers = {
	[INIT_TESTS]: (state, {tests}) => {
		state = update(state, {tests: {$set: tests}})
		return state
	},
	[ADD_TEST]: (state, {id}) => {
		return update(state, {tests: {$push: [{
			id,
			serverId: null,
			projectId: null,
			groupId: null,
			errors: {},
			name: '',
			description: '',
			isSelected: false
		}]}})
	},
	[MOVE_TEST]: (state, {dragIndex, hoverIndex}) => {
		const dragRow = state.tests[dragIndex]
		return update(state, {tests: {$splice: [
			[dragIndex, 1],
			[hoverIndex, 0, dragRow],
		]}})
	},
	[DELETE_TEST]: (state, {id}) => {
		let index = state.tests.findIndex((test) => {
			return test.id == id
		})
		return update(state, {tests: {$splice: [
			[index, 1]
		]}})
	},
	[TOGGLE_SELECT_TEST]: (state, {id, multiSelect}) => {
		let index = state.tests.findIndex((test) => {
			return test.id == id
		})
		let newValue = !state.tests[index].isSelected
		let tests
		if(!multiSelect){
			tests = state.tests.map((p) => {
				return {...p, isSelected: false}
			})

			tests[index].isSelected = newValue
		} else {
			tests = state.tests.slice(0)
			tests[index].isSelected = newValue
		}
		return update(state, {tests: {$set: tests}})
	},
	[CHANGE_NAME]: (state, {id, value}) => {
		let index = state.tests.findIndex((test) => {
			return test.id == id
		})
		let newValue = {name: value}
		return update(state, {tests: {[index]: {$merge: newValue}}})
	},
	[CHANGE_DESCRIPTION]: (state, {id, value}) => {
		let index = state.tests.findIndex((test) => {
			return test.id == id
		})
		let newValue = {description: value}
		return update(state, {tests: {[index]: {$merge: newValue}}})
	},
	[SET_ERRORS]: (state, {id, errors}) => {
		let index = state.tests.findIndex((test) => {
			return test.id == id
		})
		return update(state, {tests: {[index]: {$merge: {errors: errors}}}})
	},
	[SAVE_CHANGES]: (state) => {
		return update(state, {$merge: {hasChanges: false}})
	},
	DEFAULT: state => state,
}

const TestFormReducer = (state, action) => {
	if(state.hasChanges == false &&
        action.type != TOGGLE_SELECT_TEST &&
        action.type != SAVE_CHANGES &&
        action.type != INIT_TESTS
	){
		state = update(state, {$merge: {hasChanges: true}})
	}
	let handle = handlers[action.type] || handlers.DEFAULT
	return handle(state, action)
}

export default TestFormReducer