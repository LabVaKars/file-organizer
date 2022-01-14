
import { processSql } from ".";
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

ruleSql.set(Rule.copyRule, async ([id]: any) => {
    let toCopy = await processSql(Rule.getRuleById,[id])
    delete toCopy.id
    let newId = await processSql(Rule.insertRule, [toCopy])
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

ruleSql.set(Rule.formRule, async ([ruleId]: any) => {
    let ruleFormat:any = {}
    // selecting action
    let selectedRule : any = await knSqlite.select(
        "r.conditionId as conditionId",
        "a.type as type",
        "a.includeSubfolders as includeSubfolders",
        "sf.path as source",
        "df.path as destination",
    ).from("rules as r").where("r.id", ruleId)
    .innerJoin("actions as a","r.actionId","=","a.id")
    .innerJoin("folders as sf","a.sourceId","=","sf.id")
    .innerJoin("folders as df","a.destinationId","=","df.id")
    ruleFormat["source"] = selectedRule.source;
    ruleFormat["destination"] = selectedRule.destination;
    ruleFormat["action"] = selectedRule.type;
    ruleFormat["includeSubfolders"] = selectedRule.includeSubfolders;

    let conditionId = selectedRule.conditionId

    // selecting conditions
    let rootConditions: any = new Map()
    rootConditions.set(conditionId, {})

    let conditions = await knSqlite.raw(`
        SELECT DISTINCT par.id as "id", par.assosiation, null as "parent"
        FROM conditionParts cp
        INNER JOIN conditions par ON par.id = cp.conditionId
        WHERE (
            SELECT COUNT(*)
            FROM conditionParts cp
            WHERE cp.subConditionId = par.id
        ) = 0
        UNION
        SELECT ch.id as "id", ch.assosiation, par.id as "parent"
        FROM conditionParts cp
        INNER JOIN conditions par ON par.id = cp.conditionId
        INNER JOIN conditions ch ON ch.id = cp.subConditionId
    `)
    // console.log(conditions)
    conditions.forEach((condition:any) => {
        if (condition.parent == null) delete condition.parent
    })

    for(let j = 0; j<conditions.length; j++){
        let condition = conditions[j]
        let filters = await knSqlite.select(
            "f.field",
            "f.comparator",
            "f.value"
        )
        .from("filters as f")
        .innerJoin("conditionParts as cp","cp.filterId","=","f.id")
        .where("cp.conditionId",condition.id)
        // console.log(filters)
        condition["filters"] = filters
    }

    console.log("conditions", conditions)

    let rootCondition = tree(conditions, undefined)
    console.log("rootCondition", rootCondition)
    ruleFormat["condition"] = rootCondition[0]

    return ruleFormat
})

let tree = function (data:any, root:any) {
    // console.log(data)
    let t:any = {};
    data.forEach((o:any) => {
        console.log(o)
        Object.assign(t[o.id] = t[o.id] || {}, o);
        t[o.parent] = t[o.parent] || {};
        t[o.parent].conditions = t[o.parent].conditions || [];
        t[o.parent].conditions.push(t[o.id]);
    });
    console.log(t)
    return t[root].conditions;
};


export {ruleSql}