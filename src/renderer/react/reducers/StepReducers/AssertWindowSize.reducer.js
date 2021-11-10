import update from 'immutability-helper'
import { CLEAN_FORM } from 'tg_constants/StepTypes/StepFormCommon.types'
import { CHANGE_WIDTH, CHANGE_HEIGHT } from 'tg_constants/StepTypes/AssertWindowSize.types'

const handlers = {
	[CLEAN_FORM]: (state) => {
		return update(state, {$set: { width: 0, height: 0 }})
    },
    [CHANGE_WIDTH]: (state, {width}) => {
        return update(state, {$merge: {width: width}});
    },
    [CHANGE_HEIGHT]: (state, {height}) => {
        return update(state, {$merge: {height: height}});
    },
	DEFAULT: state => state,
}

const AssertWindowSizeReducer = (state, action) => {
	let handle = handlers[action.type] || handlers.DEFAULT
	return handle(state, action)
}

export default AssertWindowSizeReducer