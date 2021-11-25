// import {useReducer} from 'react'

// import ProjectFormReducer from 'tg_reducers/TableFormReducer'

function useTableForm(){

	// let initialState = {
	// 	table: {
	// 		name: null,
	// 		columns: [],
	// 		rows: []
	// 	}
	// }

	// const [tableState, tableReducer] = useReducer(ProjectFormReducer, initialState)

	// const [projectsLoading, setProjectsLoading] = useState(false)
	// function validateForm(projects){
	// 	let noErrors = true
	// 	for(let project of projects){
	// 		let errors = {};
	// 		if(project.name.length == 0) {
	// 			noErrors = false
	// 			errors.name = 'This field is required'
	// 		}
	// 		tableReducer({type:c.SET_ERRORS, id: project.id, errors: errors})
	// 	}
	// 	return noErrors
	// }

	// async function getProjectData(){
	// 	setProjectsLoading(true)
	// 	let projects = await projectService.getAllProjects()
	// 	setProjectsLoading(false)
	// 	console.log(projects)
	// 	projects = serverToLocalState(projects)
	// 	tableReducer({type:c.INIT_PROJECTS, projects: projects})
	// }

	// async function updateProjectData(){
	// 	console.log(tableState)
	// 	setProjectsLoading(true)
	// 	let projects = await projectService.saveAllProjects(localToServerState(tableState.projects))
	// 	setProjectsLoading(false)
	// 	console.log(projects)
	// 	projects = serverToLocalState(projects)
	// 	tableReducer({type:c.INIT_PROJECTS, projects: projects})
	// 	tableReducer({type:c.SAVE_CHANGES})
	// }

	// function addProject(){
	// 	let id = shortid.generate()
	// 	tableReducer({type:c.ADD_PROJECT, id: id})
	// }

	// function deleteProject(id){
	// 	tableReducer({type:c.DELETE_PROJECT, id: id})
	// }

	// function selectProject(id){
	// 	tableReducer({type:c.TOGGLE_SELECT_PROJECT, id: id, multiSelect: false})
	// }

	// function saveChanges(){
	// 	updateProjectData()
	// 	console.log('Changes saved')

	// 	if(validateForm(tableState.projects)){
	// 		updateProjectData()
	// 		console.log('Changes saved')
	// 	}
	// }

	// return [
	// 	tableState,
	// 	tableReducer
	// ]

}

export default useTableForm