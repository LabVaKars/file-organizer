import {useReducer, useState} from 'react'
import shortid from 'shortid'

import ProjectFormReducer from 'tg_reducers/ProjectReducers/ProjectForm.reducer'
import projectService from 'tg_services/project.service'
import { ADD_PROJECT, DELETE_PROJECT, TOGGLE_SELECT_PROJECT, SAVE_CHANGES, INIT_PROJECTS, SET_ERRORS } from 'tg_constants/ProjectTypes/Project.types'

function useProjectTableForm(){

	let initialState = {
		projects: [],
		hasChanges: false
	}

	const [projectForm, projectFormR] = useReducer(ProjectFormReducer, initialState)

	const [projectsLoading, setProjectsLoading] = useState(false)
	function validateForm(projects){
		let noErrors = true
		for(let project of projects){
			let errors = {};
			if(project.name.length == 0) {
				noErrors = false
				errors.name = 'This field is required'
			}
			projectFormR({type:SET_ERRORS, id: project.id, errors: errors})
		}
		return noErrors
	}

	async function getProjectData(){
		setProjectsLoading(true)
		let projects = await projectService.getAllProjects()
		setProjectsLoading(false)
		console.log(projects)
		projects = serverToLocalState(projects)
		projectFormR({type:INIT_PROJECTS, projects: projects})
	}

	async function updateProjectData(){
		console.log(projectForm)
		setProjectsLoading(true)
		let projects = await projectService.saveAllProjects(localToServerState(projectForm.projects))
		setProjectsLoading(false)
		console.log(projects)
		projects = serverToLocalState(projects)
		projectFormR({type:INIT_PROJECTS, projects: projects})
		projectFormR({type:SAVE_CHANGES})
	}

	function addProject(){
		let id = shortid.generate()
		projectFormR({type:ADD_PROJECT, id: id})
	}

	function deleteProject(id){
		projectFormR({type:DELETE_PROJECT, id: id})
	}

	function selectProject(id){
		projectFormR({type:TOGGLE_SELECT_PROJECT, id: id, multiSelect: false})
	}

	function saveChanges(){
		updateProjectData()
		console.log('Changes saved')

		if(validateForm(projectForm.projects)){
			updateProjectData()
			console.log('Changes saved')
		}
	}

	return {
		projectForm,
		projectFormR,
		getProjectData,
		updateProjectData,
		addProject,
		deleteProject,
		selectProject,
		saveChanges,
		projectsLoading,
	}

}

export default useProjectTableForm