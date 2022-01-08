
import { Folder } from "../enums/sqlipc";
import { knSqlite } from "../main";

let folderSql = new Map()
folderSql.set(Folder.getFolders, () => {
    let statement = knSqlite.select("id","name","description","path").from("folders")
    console.log(Folder.getFolders, statement.toSQL())
    let result = statement.then((rows: any) => {
        return rows
    })
    return result
})

folderSql.set(Folder.getFolderById, ([id]:any) => {
    let statement = knSqlite.select("id","name","description","path").from("folders").where({id})
    console.log(Folder.getFolderById, statement.toSQL())
    let result = statement.then((rows: any) => {
        return rows[0]
    })
    return result
})

folderSql.set(Folder.insertFolder, async ([folder]: any) => {
    let toInsert = folder
    delete toInsert.id
    const trx = await knSqlite.transaction();
    await trx.insert(toInsert).into("folders")
    let [returnId] = (await trx.raw("SELECT last_insert_rowid() as 'id'"))
    await trx.commit()

    let newId = returnId.id
    console.log("newId", newId)
    return newId
})

folderSql.set(Folder.updateFolder, ([folder]: any) => {
    let id = folder.id
    let toUpdate = folder
    delete toUpdate.id
    console.log(toUpdate)
    knSqlite.transaction(function(trx) {
        let statement = knSqlite("folders").where({id}).update(toUpdate)
        statement
        .transacting(trx)
        .then(trx.commit)
        console.log(Folder.updateFolder, statement.toSQL())
    })
    return
})

folderSql.set(Folder.deleteFolder, ([folderId]: any) => {
    let id = folderId
    knSqlite.transaction(function(trx) {
        console.log(folderId)
        let statement = knSqlite("folders").where({id}).delete()
        statement
        .transacting(trx)
        .then(trx.commit)
        console.log(Folder.deleteFolder, statement.toSQL())
    })
    return
})

export {folderSql}