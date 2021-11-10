import update from 'immutability-helper'
import { CLEAN_FORM } from 'tg_constants/StepTypes/StepFormCommon.types'

const handlers = {
	[CLEAN_FORM]: (state) => {
		return update(state, {$set: {}})
	},
	DEFAULT: state => state,
}

const emptyFormReducer = (state, action) => {
	let handle = handlers[action.type] || handlers.DEFAULT
	return handle(state, action)
}

export default emptyFormReducer