
import { Rule } from "../enums/sqlipc";
import { knSqlite } from "../main";

let ruleSql = new Map()
ruleSql.set(Rule.getRules, () => {
    let statement = knSqlite.select(
        "r.id",
        "r.name",
        "r.description",
        "a.name as action",
        "c.name as condition",
        "t.name as timetable",
    ).from("rules as r")
    .innerJoin("actions as a","r.actionId","=","a.id")
    .innerJoin("conditions as c","r.conditionId","=","c.id")
    .innerJoin("timetables as t","r.timetableId","=","t.id")
    console.log(Rule.getRules, statement.toSQL())
    let result = statement.then((rows: any) => {
        return rows
    })
    return result
})

ruleSql.set(Rule.getRuleById, ([id]:any) => {
    let statement = knSqlite.select(
        "r.id",
        "r.name",
        "r.description",
        "a.id as actionId",
        "t.id as timetableId",
        "c.id as conditionId",
        "a.name as action",
        "t.name as timetable",
        "c.name as condition",
    ).from("rules as r").where("r.id", id)
    .innerJoin("actions as a","r.actionId","=","a.id")
    .innerJoin("timetables as t","r.timetableId","=","t.id")
    .innerJoin("conditions as c","r.conditionId","=","c.id")
    console.log(Rule.getRuleById, statement.toSQL())
    let result = statement.then((rows: any) => {
        return rows[0]
    })
    return result
})

ruleSql.set(Rule.insertRule, async ([rule]: any) => {
    let toInsert = rule
    delete toInsert.id
    const trx = await knSqlite.transaction();
    await trx.insert(toInsert).into("rules")
    let [returnId] = (await trx.raw("SELECT last_insert_rowid() as 'id'"))
    await trx.commit()

    let newId = returnId.id
    console.log("newId", newId)
    return newId
})

ruleSql.set(Rule.updateRule, ([rule]: any) => {
    let id = rule.id
    let toUpdate = rule
    delete toUpdate.id
    console.log(toUpdate)
    knSqlite.transaction(function(trx) {
        let statement = knSqlite("rules").where({id}).update(toUpdate)
        statement
        .transacting(trx)
        .then(trx.commit)
        console.log(Rule.updateRule, statement.toSQL())
    })
    return
})

ruleSql.set(Rule.deleteRule, ([ruleId]: any) => {
    let id = ruleId
    knSqlite.transaction(function(trx) {
        console.log(ruleId)
        let statement = knSqlite("rules").where({id}).delete()
        statement
        .transacting(trx)
        .then(trx.commit)
        console.log(Rule.deleteRule, statement.toSQL())
    })
    return
})

export {ruleSql}