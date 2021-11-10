// import update from 'immutability-helper'
// import * as c from 'tg_constants/TableTypes'


// const handlers = {
// 	[c.INIT_TABLE]: (state, {rules}) => {
// 		state = update(state, {rules: {$set: rules}})
// 		return state
// 	},
// 	[c.ADD_ROW]: (state, {id}) => {
// 		return update(state, {rules: {$push: [{
// 			id,
// 			serverId: null,
// 			name: '',
// 			errors: {},
// 			isSelected: false
// 		}]}})
// 	},
// 	[c.DELETE_ROW]: (state, {id}) => {
// 		let index = state.rules.findIndex((rule) => {
// 			return rule.id == id
// 		})
// 		return update(state, {rules: {$splice: [
// 			[index, 1]
// 		]}})
// 	},
// 	[c.TOGGLE_SELECT_ROW]: (state, {id, multiSelect}) => {
// 		let index = state.rules.findIndex((rule) => {
// 			return rule.id == id
// 		})
// 		let newValue = !state.rules[index].isSelected
// 		let rules
// 		if(!multiSelect){
// 			rules = state.rules.map((p) => {
// 				return {...p, isSelected: false}
// 			})

// 			rules[index].isSelected = newValue
// 		} else {
// 			rules = state.rules.slice(0)
// 			rules[index].isSelected = newValue
// 		}
// 		return update(state, {rules: {$set: rules}})
// 	},
// 	// [CHANGE_NAME]: (state, {id, value}) => {
// 	// 	let index = state.rules.findIndex((rule) => {
// 	// 		return rule.id == id
// 	// 	})
// 	// 	let newValue = {name: value}
// 	// 	return update(state, {rules: {[index]: {$merge: newValue}}})
// 	// },
// 	// [c.CHANGE_BASE_URL]: (state, {id, value}) => {
// 	// 	let index = state.rules.findIndex((rule) => {
// 	// 		return rule.id == id
// 	// 	})
// 	// 	let newValue = {baseUrl: value}
// 	// 	return update(state, {rules: {[index]: {$merge: newValue}}})
// 	// },
// 	// [c.SET_ERRORS]: (state, {id, errors}) => {
// 	// 	let index = state.rules.findIndex((rule) => {
// 	// 		return rule.id == id
// 	// 	})
// 	// 	return update(state, {rules: {[index]: {$merge: {errors: errors}}}})
// 	// },
// 	[c.SAVE_CHANGES]: (state) => {
// 		return update(state, {$merge: {hasChanges: false}})
// 	},
// 	DEFAULT: state => state,
// }

// const ProjectFormReducer = (state, action) => {
// 	if(state.hasChanges == false &&
//         action.type != c.TOGGLE_SELECT_PROJECT &&
//         action.type != c.SAVE_CHANGES &&
//         action.type != c.INIT_PROJECTS
// 	){
// 		state = update(state, {$merge: {hasChanges: true}})
// 	}
// 	let handle = handlers[action.type] || handlers.DEFAULT
// 	return handle(state, action)
// }

// export default ProjectFormReducer