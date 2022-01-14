
import { processSql } from ".";
import { Timetable } from "../enums/sqlipc";
import { knSqlite } from "../main";

let timetableSql = new Map()
timetableSql.set(Timetable.getTimetables, () => {
    let statement = knSqlite
        .select(
            "t.id",
            "t.name",
            "t.description",
            knSqlite.raw("t.startDate || ' ' || t.startTime as startTime"),
            knSqlite.raw("t.frequency || ' ' || t.frequencyMeasure || 's' as frequency"),
        )
        .from("timetables as t")
    console.log(Timetable.getTimetables, statement.toSQL())
    let result = statement.then((rows: any) => {
        return rows
    })
    return result
})

timetableSql.set(Timetable.getTimetableById, ([id]:any) => {
    let statement = knSqlite.select(
        "t.id",
        "t.name",
        "t.description",
        "t.startDate",
        "t.startTime",
        "t.frequency",
        "t.frequencyMeasure"
        )
        .from("timetables as t").where("t.id", id)
    console.log(Timetable.getTimetableById, statement.toSQL())
    let result = statement.then((rows: any) => {
        return rows[0]
    })
    return result
})

timetableSql.set(Timetable.insertTimetable, async ([timetable]: any) => {
    let toInsert = timetable
    delete toInsert.id
    const trx = await knSqlite.transaction();
    await trx.insert(toInsert).into("timetables")
    let [returnId] = (await trx.raw("SELECT last_insert_rowid() as 'id'"))
    await trx.commit()

    let newId = returnId.id
    console.log("newId", newId)
    return newId
})

timetableSql.set(Timetable.copyTimetable, async ([id]: any) => {
    let toCopy = await processSql(Timetable.getTimetableById,[id])
    delete toCopy.id
    let newId = await processSql(Timetable.insertTimetable, [toCopy])
    return newId
})

timetableSql.set(Timetable.updateTimetable, ([timetable]: any) => {
    let id = timetable.id
    let toUpdate = timetable
    delete toUpdate.id
    console.log(toUpdate)
    knSqlite.transaction(function(trx) {
        let statement = knSqlite("timetables").where({id}).update(toUpdate)
        statement
        .transacting(trx)
        .then(trx.commit)
        console.log(Timetable.updateTimetable, statement.toSQL())
    })
    return
})

timetableSql.set(Timetable.deleteTimetable, ([timetableId]: any) => {
    let id = timetableId
    knSqlite.transaction(function(trx) {
        console.log(timetableId)
        let statement = knSqlite("timetables").where({id}).delete()
        statement
        .transacting(trx)
        .then(trx.commit)
        console.log(Timetable.deleteTimetable, statement.toSQL())
    })
    return
})

export {timetableSql}