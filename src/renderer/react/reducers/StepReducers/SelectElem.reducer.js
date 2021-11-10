import update from 'immutability-helper'
import { CLEAN_FORM } from 'tg_constants/StepTypes/StepFormCommon.types'
import { CHANGE_NAME, CHANGE_CSS_SELECTOR } from 'tg_constants/StepTypes/SelectElem.types'
import StepFormReducer from '../TestReducers/StepForm.reducer'


const handlers = {
	[CLEAN_FORM]: (state) => {
		return update(state, {$set: {name: "", cssSelector: ""}})
    },
    [CHANGE_NAME]: (state, {name}) => {
        return update(state, {$merge: {name: name}})
    },
    [CHANGE_CSS_SELECTOR]: (state, {cssSelector}) => {
        return update(state, {$merge: {cssSelector: cssSelector}})
    },
	DEFAULT: state => state,
}

const selectElemReducer = (state, action) => {
	let handle = handlers[action.type] || handlers.DEFAULT
	return handle(state, action)
}

export default selectElemReducer