import { Condition } from "main/enums/sqlipc"
import { useDispatch } from "react-redux"
import { initTable } from "tg_reducers/SubConditionsTableReducer"
import { useSql } from "./utilHooks"

let runSql = useSql()
let dispatch = useDispatch()

export const getSubConditions = async (conditionId: any) => {
    console.log("Getting conditions from")
    let result = await runSql(Condition.getSubConditions, conditionId)
    dispatch(initTable(result))
    console.log('In React Renderer', result)
}

export const addSubCondition = async (editId: any, parentId: any) => {
    let newId = await runSql(Condition.insertCondition, {
      name: "New Condition",
      description: "",
      assosiation: "OR"
    })
    console.log("editId", editId)
    console.log("parentId", parentId)
    console.log("newId", newId)
    await runSql(Condition.addSubCondition, editId, newId)
    getSubConditions(editId)
}
