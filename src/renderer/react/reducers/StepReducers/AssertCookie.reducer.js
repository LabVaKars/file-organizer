import update from 'immutability-helper'
import { CLEAN_FORM } from 'tg_constants/StepTypes/StepFormCommon.types'
import { EQUALS } from 'tg_constants/StepTypes/StepFormCommon.types'
import { CHANGE_COOKIE, CHANGE_SIGN, CHANGE_COMPARATOR, CHANGE_TEXT } from 'tg_constants/StepTypes/AssertCookie.types'

const handlers = {
	[CLEAN_FORM]: (state) => {
		return update(state, {$set: { cookie: '', sign: false, comparator: EQUALS, text:'' }})
    },
    [CHANGE_COOKIE]: (state, {cookie}) => {
        return update(state, {$merge: {cookie: cookie}});
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

const AssertCookieReducer = (state, action) => {
	let handle = handlers[action.type] || handlers.DEFAULT
	return handle(state, action)
}

export default AssertCookieReducer