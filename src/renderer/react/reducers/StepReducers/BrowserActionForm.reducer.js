import update from 'immutability-helper'
import { CLEAN_FORM } from 'tg_constants/StepTypes/StepFormCommon.types'
import { CHOOSE_ACTION } from 'tg_constants/StepTypes/BrowserActionForm.types'

const handlers = {
	[CLEAN_FORM]: (state) => {
		return update(state, {$set: { action: '1' }})
	},
	[CHOOSE_ACTION]: (state, {option}) => {
		return update(state, {$merge: { action: option }})
	},
	DEFAULT: state => state,
}

const browserActionFormReducer = (state, action) => {
	let handle = handlers[action.type] || handlers.DEFAULT
	return handle(state, action)
}

export default browserActionFormReducer