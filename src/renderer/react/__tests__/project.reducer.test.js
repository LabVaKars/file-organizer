// import ProjectFormReducer from 'tg_reducers/ProjectReducers/ProjectForm.reducer'
// import { ADD_PROJECT, DELETE_PROJECT } from 'tg_constants/ProjectTypes/Project.types'

// describe("Project reducer", () => {

//     it("Must properly add project", () => {
//         let initialState = { projects: [] }
//         let result = ProjectFormReducer(initialState, {type:ADD_PROJECT, id: "1"})
//         expect(result.projects).toEqual(
//             expect.arrayContaining([
//                 expect.objectContaining({
//                     id: '1',
//                     serverId: null,
//                     name: '',
//                     errors: {},
//                     isSelected: false
//                 })
//             ])
//         )
//     })

//     it("Must properly delete project", () => {
//         let state = { projects: [{
//             id: '1',
//             serverId: null,
//             name: '',
//             errors: {},
//             isSelected: false
//         }]}
//         let result = ProjectFormReducer(state, {type:DELETE_PROJECT, id: "1"})
//         expect(result.projects).toStrictEqual([])
//     })

// })