import update from 'immutability-helper'
import { CLEAN_FORM } from 'tg_constants/StepTypes/StepFormCommon.types'
import { EQUALS } from 'tg_constants/StepTypes/StepFormCommon.types'
import { CHANGE_PROPERTY, CHANGE_SIGN, CHANGE_COMPARATOR, CHANGE_TEXT } from 'tg_constants/StepTypes/AssertCSSProp.types'

const handlers = {
	[CLEAN_FORM]: (state) => {
		return update(state, {$set: { property: '', sign: false, comparator: EQUALS, text:'' }})
    },
    [CHANGE_PROPERTY]: (state, {property}) => {
        return update(state, {$merge: {property: property}});
    },
    [CHANGE_SIGN]: (state, {sign}) => {
        return update(state, {$merge: {sign: (sign == 'true') ? true : false}});
    },
    [CHANGE_COMPARATOR]: (state, {comparator}) => {
        return update(state, {$merge: {comparator: comparator}});
    },
    [CHANGE_TEXT]: (state, {text}) => {
        return update(state, {$merge: {text: text}})
    },
	DEFAULT: state => state,
}

const AssertCSSPropReducer = (state, action) => {
	let handle = handlers[action.type] || handlers.DEFAULT
	return handle(state, action)
}

export default AssertCSSPropReducer