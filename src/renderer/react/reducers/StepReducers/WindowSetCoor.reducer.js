import update from 'immutability-helper'
import { CLEAN_FORM } from 'tg_constants/StepTypes/StepFormCommon.types'
import { CHANGE_X_COOR, CHANGE_Y_COOR } from 'tg_constants/StepTypes/WindowSetCoor.types'

const handlers = {
	[CLEAN_FORM]: (state) => {
		return update(state, {$set: { x: 0, y: 0 }})
    },
    [CHANGE_X_COOR]: (state, {xCoor}) => {
        return update(state, {$merge: {x: xCoor}});
    },
    [CHANGE_Y_COOR]: (state, {yCoor}) => {
        return update(state, {$merge: {y: yCoor}});
    },
	DEFAULT: state => state,
}

const WindowSetCoorReducer = (state, action) => {
	let handle = handlers[action.type] || handlers.DEFAULT
	return handle(state, action)
}

export default WindowSetCoorReducer