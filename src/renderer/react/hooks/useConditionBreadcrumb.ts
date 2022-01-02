// import {useState} from 'react'

// function useConditionBreadcrumb(projectId, groupId, testId){

// 	const [breadcrumb, setBreadcrumb] = useState([])

// 	function serverToLocalState(groups){

// 		let result = groups.map((b) => {
// 			return {
// 				name: b.name,
// 				link: (b.groupId && b.groupId != 'root') ? `/project/${projectId}/group/${b.groupId}` : `/project/${projectId}`
// 			}
// 		})
// 		return result
// 	}

// 	async function getBreadcrumbData(){

// 		let names = await groupService.getGroupBreadcrumb(projectId, groupId, testId)
// 		console.log(names)

// 		setBreadcrumb(serverToLocalState(names))
// 	}

// 	return {
// 		breadcrumb,
// 		getBreadcrumbData
// 	}

// }

// export default useConditionBreadcrumb