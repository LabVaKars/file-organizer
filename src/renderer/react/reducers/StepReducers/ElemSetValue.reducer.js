import update from 'immutability-helper'
import { CLEAN_FORM } from 'tg_constants/StepTypes/StepFormCommon.types'
import { CHANGE_VALUE } from 'tg_constants/StepTypes/ElemSetValue.types'

const handlers = {
	[CLEAN_FORM]: (state) => {
		return update(state, {$set: { value:'' }})
	},
	[CHANGE_VALUE]: (state, {value}) => {
		return update(state, {$merge: { value: value }})
	},
	DEFAULT: state => state,
}

const ElementSetValueReducer = (state, action) => {
	let handle = handlers[action.type] || handlers.DEFAULT
	return handle(state, action)
}

export default ElementSetValueReducer