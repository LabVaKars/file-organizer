import update from 'immutability-helper'
import { INIT_GROUPS, ADD_GROUP, DELETE_GROUP, TOGGLE_SELECT_GROUP, CHANGE_NAME, CHANGE_DESCRIPTION, SAVE_CHANGES, MOVE_GROUP, SET_ERRORS } from 'tg_constants/GroupTypes/Group.types'


const handlers = {
	[INIT_GROUPS]: (state, {groups}) => {
		state = update(state, {groups: {$set: groups}})
		return state
	},
	[ADD_GROUP]: (state, {id}) => {
		return update(state, {groups: {$push: [{
			id,
			serverId: null,
			projectId: null,
			groupId: null,
			errors: {},
			name: '',
			description: '',
			isSelected: false
		}]}})
	},
	[MOVE_GROUP]: (state, {dragIndex, hoverIndex}) => {
		const dragRow = state.groups[dragIndex]
		return update(state, {groups: {$splice: [
			[dragIndex, 1],
			[hoverIndex, 0, dragRow],
		]}})
	},
	[DELETE_GROUP]: (state, {id}) => {
		let index = state.groups.findIndex((group) => {
			return group.id == id
		})
		return update(state, {groups: {$splice: [
			[index, 1]
		]}})
	},
	[TOGGLE_SELECT_GROUP]: (state, {id, multiSelect}) => {
		let index = state.groups.findIndex((group) => {
			return group.id == id
		})
		let newValue = !state.groups[index].isSelected
		let groups
		if(!multiSelect){
			groups = state.groups.map((p) => {
				return {...p, isSelected: false}
			})

			groups[index].isSelected = newValue
		} else {
			groups = state.groups.slice(0)
			groups[index].isSelected = newValue
		}
		return update(state, {groups: {$set: groups}})
	},
	[CHANGE_NAME]: (state, {id, value}) => {
		let index = state.groups.findIndex((group) => {
			return group.id == id
		})
		let newValue = {name: value}
		return update(state, {groups: {[index]: {$merge: newValue}}})
	},
	[CHANGE_DESCRIPTION]: (state, {id, value}) => {
		let index = state.groups.findIndex((group) => {
			return group.id == id
		})
		let newValue = {description: value}
		return update(state, {groups: {[index]: {$merge: newValue}}})
	},
	[SET_ERRORS]: (state, {id, errors}) => {
		let index = state.groups.findIndex((group) => {
			return group.id == id
		})
		return update(state, {groups: {[index]: {$merge: {errors: errors}}}})
	},
	[SAVE_CHANGES]: (state) => {
		return update(state, {$merge: {hasChanges: false}})
	},
	DEFAULT: state => state,
}

const GroupFormReducer = (state, action) => {
	if(state.hasChanges == false &&
        action.type != TOGGLE_SELECT_GROUP &&
        action.type != SAVE_CHANGES &&
        action.type != INIT_GROUPS
	){
		state = update(state, {$merge: {hasChanges: true}})
	}
	let handle = handlers[action.type] || handlers.DEFAULT
	return handle(state, action)
}

export default GroupFormReducer