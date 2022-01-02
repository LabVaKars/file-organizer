import { conditionSql } from "./conditions.model"
import { filterSql } from "./filters.model"
import { folderSql } from "./folders.model"

let models = new Map()

models.set("folder", folderSql)
models.set("filter", filterSql)
models.set("condition", conditionSql)

export function processSql(sqlCode: string, args: any){
    let model = sqlCode.split(":")[0]
    console.log(model)
    console.log(sqlCode)
    let result = models.get(model).get(sqlCode)(args)
    console.log(result)
    return result
}