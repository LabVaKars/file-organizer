import update from 'immutability-helper'
import { CLEAN_FORM } from 'tg_constants/StepTypes/StepFormCommon.types'
import { CHANGE_TEXT } from 'tg_constants/StepTypes/AssertPrompt.types'

const handlers = {
	[CLEAN_FORM]: (state) => {
		return update(state, {$set: {text: ''}})
	},
	[CHANGE_TEXT]:(state, {text}) => {
		return update(state, {$merge: {text: text}})
	},
	DEFAULT: state => state,
}

const AssertPromptReducer = (state, action) => {
	let handle = handlers[action.type] || handlers.DEFAULT
	return handle(state, action)
}

export default AssertPromptReducer