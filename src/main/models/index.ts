import { actionSql } from "./actions.model"
import { conditionSql } from "./conditions.model"
import { filterSql } from "./filters.model"
import { folderSql } from "./folders.model"
import { ruleSql } from "./rules.model"
import { timetableSql } from "./timetables.model"

let models = new Map()

models.set("folder", folderSql)
models.set("filter", filterSql)
models.set("condition", conditionSql)
models.set("action", actionSql)
models.set("timetable", timetableSql)
models.set("rule", ruleSql)

export function processSql(sqlCode: string, args: any){
    let model = sqlCode.split(":")[0]
    console.log(model)
    console.log(sqlCode)
    let result = models.get(model).get(sqlCode)(args)
    console.log(result)
    return result
}