import update from 'immutability-helper'
import emptyFormReducer from '../StepReducers/EmptyForm.reducer'

import { ADD_STEP, DELETE_STEP, MOVE_STEP, CURRENT_FORM_REDUCER, TOGGLE_SELECT_STEP, CHANGE_STEP_BY_ID, INIT_STEPS } from 'tg_constants/TestTypes/StepForm.types'
import { EMPTY_STEP, BROWSER_URL, BROWSER_ACTION } from 'tg_constants/Step.types'
import browserUrlFormReducer from 'tg_reducers/StepReducers/BrowserUrlForm.reducer'
import { CLEAN_FORM } from 'tg_constants/StepTypes/StepFormCommon.types'
import browserActionFormReducer from 'tg_reducers/StepReducers/BrowserActionForm.reducer'
import { SELECT_ELEM, ELEM_SET_VALUE, ELEM_ASSERT_STATE, ELEM_ASSERT_HTML_ATTR, ELEM_ASSERT_CSS_PROP, ELEM_ASSERT_VALUE, ELEM_ASSERT_TEXT, ELEM_ASSERT_TAG_NAME, ELEM_ASSERT_COOR, ELEM_ASSERT_SIZE, COOKIE_ASSERT, COOKIE_DELETE, COOKIE_UPDATE, BROWSER_ASSERT_TITLE, BROWSER_ASSERT_URL, PROMPT_ACTION, PROMPT_ASSERT, PROMPT_SET_VALUE, WINDOW_ASSERT_COOR, WINDOW_ASSERT_SIZE, WINDOW_SET_COOR, WINDOW_SET_SIZE, ELEM_CLICK } from 'tg_constants/Step.types'
import { ADD_ELEM_STEP, SAVE_CHANGES, SET_ERRORS } from 'tg_constants/TestTypes/StepForm.types'
import selectElemReducer from '../StepReducers/SelectElem.reducer'
import ElementSetValueReducer from '../StepReducers/ElemSetValue.reducer'
import AssertElemStateReducer from '../StepReducers/AssertElemState.reducer'
import AssertHTMLPropReducer from '../StepReducers/AssertHTMLProp.reducer'
import AssertCSSPropReducer from '../StepReducers/AssertCSSProp.reducer'
import AssertElemValueReducer from '../StepReducers/AssertElemValue.reducer'
import AssertElemTextReducer from '../StepReducers/AssertElemText.reducer'
import AssertElemTagNameReducer from '../StepReducers/AssertElemTagName.reducer'
import AssertElemCoorReducer from '../StepReducers/AssertElemCoor.reducer'
import AssertElemSizeReducer from '../StepReducers/AssertElemSize.reducer'
import AssertCookieReducer from '../StepReducers/AssertCookie.reducer'
import CookieDeleteReducer from '../StepReducers/CookieDelete.reducer'
import CookieUpdateReducer from '../StepReducers/CookieUpdate.reducer'
import AssertBrowserTitleReducer from '../StepReducers/AssertBrowserTitle.reducer'
import AssertBrowserUrlReducer from '../StepReducers/AssertBrowserUrl.reducer'
import PromptActionReducer from '../StepReducers/PromptAction.reducer'
import AssertPromptReducer from '../StepReducers/AssertPrompt.reducer'
import PromptSetValueReducer from '../StepReducers/PromptSetValue.reducer'
import AssertWindowCoorReducer from '../StepReducers/AssertWindowCoor.reducer'
import AssertWindowSizeReducer from '../StepReducers/AssertWindowSize.reducer'
import WindowSetCoorReducer from '../StepReducers/WindowSetCoor.reducer'
import WindowSetSizeReducer from '../StepReducers/WindowSetSize.reducer'
import ElemClickReducer from '../StepReducers/ElemClick.reducer'

// Все редьюсеры реализуют метод CLEAN_FORM
const tg_reducers = {
	[EMPTY_STEP]: emptyFormReducer,
	[SELECT_ELEM]: selectElemReducer,
	[ELEM_SET_VALUE]: ElementSetValueReducer,
	[ELEM_CLICK]: ElemClickReducer,
	[ELEM_ASSERT_STATE]: AssertElemStateReducer,
	[ELEM_ASSERT_HTML_ATTR]: AssertHTMLPropReducer,
	[ELEM_ASSERT_CSS_PROP]: AssertCSSPropReducer,
	[ELEM_ASSERT_VALUE]: AssertElemValueReducer,
	[ELEM_ASSERT_TEXT]: AssertElemTextReducer,
	[ELEM_ASSERT_COOR]: AssertElemCoorReducer,
	[ELEM_ASSERT_SIZE]: AssertElemSizeReducer,
	[ELEM_ASSERT_TAG_NAME]: AssertElemTagNameReducer,
	[COOKIE_ASSERT]: AssertCookieReducer,
	[COOKIE_DELETE]: CookieDeleteReducer,
	[COOKIE_UPDATE]: CookieUpdateReducer,
	[PROMPT_ASSERT]: AssertPromptReducer,
	[PROMPT_ACTION]: PromptActionReducer,
	[PROMPT_SET_VALUE]: PromptSetValueReducer,
	[WINDOW_ASSERT_COOR]: AssertWindowCoorReducer,
	[WINDOW_ASSERT_SIZE]: AssertWindowSizeReducer,
	[WINDOW_SET_COOR]: WindowSetCoorReducer,
	[WINDOW_SET_SIZE]: WindowSetSizeReducer,
	[BROWSER_ASSERT_TITLE]: AssertBrowserTitleReducer,
	[BROWSER_ASSERT_URL]: AssertBrowserUrlReducer,
	[BROWSER_URL]: browserUrlFormReducer,
	[BROWSER_ACTION]: browserActionFormReducer,
	DEFAULT: emptyFormReducer
}

const handlers = {
	[INIT_STEPS]: (state, {steps}) => {
		state = update(state, {steps: {$set: steps}})
		return state
	},
	[ADD_STEP]: (state, {id, stype}) => {
		let reducer = tg_reducers[stype] || tg_reducers.DEFAULT
		let form = reducer({}, {type: CLEAN_FORM})
		return update(state, {steps: {$push: [{
			id,
			stype,
			scope: "Document",
			errors: {},
			form,
			isSelected: false
		}]}})
	},
	[ADD_ELEM_STEP]: (state, {id, elemId, stype}) => {
		let reducer = tg_reducers[stype] || tg_reducers.DEFAULT
		let form = reducer({}, {type: CLEAN_FORM})
		let index = state.steps.findIndex((s) => {
			return s.id == elemId
		})
		let elem = state.steps[index].form
		return update(state, {steps: {$push: [{
			id,
			elemId,
			scope: "Element",
			errors: {},
			stype,
			form,
			isSelected: false
		}]}})
	},
	[DELETE_STEP]: (state, {id}) => {
		let index = state.steps.findIndex((step) => {
			return step.id == id
		})
		if(state.steps[index].stype == SELECT_ELEM){
			let elemSteps = state.steps.filter((s) => {
				return s.scope == "Element" && s.elemId == id
			})
			elemSteps.forEach((s) => {
				state = StepFormReducer(state, {type: DELETE_STEP, id: s.id})
			})
		}
		return update(state, {steps: {$splice: [
			[index, 1]
		]}})
	},
	[TOGGLE_SELECT_STEP]: (state, {id, multiSelect}) => {
		let index = state.steps.findIndex((step) => {
			return step.id == id
		})
		let newValue = !state.steps[index].isSelected
		let steps
		if(!multiSelect){
			steps = state.steps.map((p) => {
				return {...p, isSelected: false}
			})

			steps[index].isSelected = newValue
		} else {
			steps = state.steps.slice(0)
			steps[index].isSelected = newValue
		}
		return update(state, {steps: {$set: steps}})
	},
	[MOVE_STEP]: (state, {dragIndex, hoverIndex}) => {
		const dragRow = state.steps[dragIndex]
		return update(state, {steps: {$splice: [
			[dragIndex, 1],
			[hoverIndex, 0, dragRow],
		]}})
	},
	[CHANGE_STEP_BY_ID]: (state, {id, stype}) => {
		let index = state.steps.findIndex((step) => {
			return step.id == id
		})
		const reducer = tg_reducers[stype] || tg_reducers.DEFAULT
		return update(state, { steps: { [index]: {$merge: {
			stype: stype,
			form: reducer(state.steps[index].form, {type:CLEAN_FORM})
		}}}})
	},
	[CURRENT_FORM_REDUCER]: (state, {action, params}) => {
		let index = state.steps.findIndex((s) => {
			return s.isSelected == true
		})

		if(index != -1){
			let {stype} = state.steps[index]
			const reducer = tg_reducers[stype] || tg_reducers.DEFAULT
			return update(state, {steps: {[index]: {$merge: {
				form: reducer(state.steps[index].form, {type:action, ...params})
			}}}})
		} else {
			return state
		}
	},
	[SET_ERRORS]: (state, {id, errors}) => {
		let index = state.steps.findIndex((step) => {
			return step.id == id
		})
		return update(state, {steps: {[index]: {$merge: {errors: errors}}}})
	},
	[SAVE_CHANGES]: (state) => {
		return update(state, {$merge: {hasChanges: false}})
	},
	DEFAULT: state => state,
}

const StepFormReducer = (state, action) => {
	if(state.hasChanges == false &&
        action.type != TOGGLE_SELECT_STEP &&
        action.type != SAVE_CHANGES &&
        action.type != INIT_STEPS
	){
		state = update(state, {$merge: {hasChanges: true}})
	}
	let handle = handlers[action.type] || handlers.DEFAULT
	return handle(state, action)
}

export default StepFormReducer