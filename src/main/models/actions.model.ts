
import { Action } from "../enums/sqlipc";
import { knSqlite } from "../main";

let actionSql = new Map()
actionSql.set(Action.getActions, () => {
    let statement = knSqlite
        .select(
            "a.id",
            "a.name",
            "a.description",
            "sf.name as source",
            "df.name as destination",
            "a.type",
            knSqlite.raw("'Subfolders: ' || IIF(a.includeSubfolders > 0, 'yes', 'no') || ', ' || "+
            "IIF(length(a.pattern) > 0, 'Pattern: ' || a.pattern, '') as settings")
        )
        .from("actions as a")
        .innerJoin("folders as sf","a.sourceId","=","sf.id")
        .innerJoin("folders as df","a.destinationId","=","df.id")
    console.log(Action.getActions, statement.toSQL())
    let result = statement.then((rows: any) => {
        return rows
    })
    return result
})

actionSql.set(Action.getActionById, ([id]:any) => {
    let statement = knSqlite.select(
        "a.id",
        "a.name",
        "a.description",
        "sf.id as sourceId",
        "df.id as destinationId",
        "sf.name as source",
        "df.name as destination",
        "a.type",
        "a.pattern",
        "a.includeSubfolders"
        )
        .from("actions as a").where("a.id", id)
        .innerJoin("folders as sf","a.sourceId","=","sf.id")
        .innerJoin("folders as df","a.destinationId","=","df.id")
    console.log(Action.getActionById, statement.toSQL())
    let result = statement.then((rows: any) => {
        return rows[0]
    })
    return result
})

actionSql.set(Action.insertAction, async ([folder]: any) => {
    let toInsert = folder
    delete toInsert.id
    const trx = await knSqlite.transaction();
    await trx.insert(toInsert).into("actions")
    let [returnId] = (await trx.raw("SELECT last_insert_rowid() as 'id'"))
    await trx.commit()

    let newId = returnId.id
    console.log("newId", newId)
    return newId
})

actionSql.set(Action.updateAction, ([folder]: any) => {
    let id = folder.id
    let toUpdate = folder
    delete toUpdate.id
    console.log(toUpdate)
    knSqlite.transaction(function(trx) {
        let statement = knSqlite("actions").where({id}).update(toUpdate)
        statement
        .transacting(trx)
        .then(trx.commit)
        console.log(Action.updateAction, statement.toSQL())
    })
    return
})

actionSql.set(Action.deleteAction, ([folderId]: any) => {
    let id = folderId
    knSqlite.transaction(function(trx) {
        console.log(folderId)
        let statement = knSqlite("actions").where({id}).delete()
        statement
        .transacting(trx)
        .then(trx.commit)
        console.log(Action.deleteAction, statement.toSQL())
    })
    return
})

export {actionSql}