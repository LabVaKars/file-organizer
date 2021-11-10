import update from 'immutability-helper'
import { CLEAN_FORM } from 'tg_constants/StepTypes/StepFormCommon.types'
import { CHANGE_VALUE } from 'tg_constants/StepTypes/ElemSetValue.types'
import { CHANGE_STATE_TYPE, CHANGE_STATE_SIGN, IS_PRESENT } from 'tg_constants/StepTypes/AssertElemState.types'

const handlers = {
	[CLEAN_FORM]: (state) => {
		return update(state, {$set: { estype:IS_PRESENT, sign: false }})
	},
	[CHANGE_STATE_TYPE]: (state, {estype}) => {
		return update(state, {$merge: {estype: estype}})
	},
	[CHANGE_STATE_SIGN]: (state, {sign}) => {
		return update(state, {$merge: {sign: (sign == 'true') ? true : false}})
	},
	DEFAULT: state => state,
}

const AssertElemStateReducer = (state, action) => {
	let handle = handlers[action.type] || handlers.DEFAULT
	return handle(state, action)
}

export default AssertElemStateReducer