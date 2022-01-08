
import { Filter } from "../enums/sqlipc";
import { knSqlite } from "../main";

let filterSql = new Map()
filterSql.set(Filter.getFilters, () => {
    let statement = knSqlite.select("id","field","comparator","value").from("filters")
    console.log(Filter.getFilters, statement.toSQL())
    let result = statement.then((rows: any) => {
        return rows
    })
    return result
})

filterSql.set(Filter.getFilterById, ([id]:any) => {
    let statement = knSqlite.select("id","field","comparator","value").from("filters").where({id})
    console.log(Filter.getFilterById, statement.toSQL())
    let result = statement.then((rows: any) => {
        return rows[0] || 0
    })
    return result
})

filterSql.set(Filter.getPrevConditionId, ([id]:any) => {
    console.log("subConditionId",id)
    let statement = knSqlite.select("conditionId").from("conditionParts").where({filterId: id})
    console.log(Filter.getPrevConditionId, statement.toSQL())
    let result = statement.then((rows: any) => {
        return rows[0] || 0
    })
    return result
})

filterSql.set(Filter.insertFilter, async ([filter]: any) => {
    let toInsert = filter
    delete toInsert.id
    const trx = await knSqlite.transaction();
    await trx.insert(toInsert).into("filters")
    let [returnId] = await trx.raw("SELECT last_insert_rowid() as 'id'")
    await trx.commit()

    let newId = returnId.id
    // knSqlite.transaction(function(trx) {
    //     let statement = knSqlite.returning("id").insert(toInsert).into("filters")
    //     newId = statement

    //     .transacting(trx)
    //     .then(trx.commit)
    //     console.log(Filter.insertFilter, statement.toSQL())
    // })
    return newId
})

filterSql.set(Filter.updateFilter, ([filter]: any) => {
    let id = filter.id
    let toUpdate = filter
    delete toUpdate.id
    console.log(toUpdate)
    knSqlite.transaction(function(trx) {
        let statement = knSqlite("filters").where({id}).update(toUpdate)
        statement
        .transacting(trx)
        .then(trx.commit)
        console.log(Filter.updateFilter, statement.toSQL())
    })
    return
})

filterSql.set(Filter.deleteFilter, ([filterId]: any) => {
    let id = filterId
    knSqlite.transaction(function(trx) {
        console.log(filterId)
        let statement = knSqlite("conditionParts").where({filterId:id}).delete()
        statement
        .transacting(trx)
        .then(trx.commit)
        console.log(Filter.deleteFilter, statement.toSQL())
    })
    knSqlite.transaction(function(trx) {
        console.log(filterId)
        let statement = knSqlite("filters").where({id}).delete()
        statement
        .transacting(trx)
        .then(trx.commit)
        console.log(Filter.deleteFilter, statement.toSQL())
    })
    return
})

export {filterSql}