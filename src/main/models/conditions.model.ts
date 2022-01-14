
import { Condition } from "../enums/sqlipc";
import { knSqlite } from "../main";
import { processSql } from ".";



let conditionSql = new Map()
conditionSql.set(Condition.getConditions, () => {
    let statement = knSqlite.select("id","name","description","assosiation").from("conditions")
    console.log(Condition.getConditions, statement.toSQL())
    let result = statement.then((rows: any) => {
        return rows
    })
    return result
})

conditionSql.set(Condition.getConditionsExceptId, ([id]:any) => {
    let statement = knSqlite.select("id","name","description","assosiation").from("conditions").whereNot({id})
    console.log(Condition.getConditionsExceptId, statement.toSQL())
    let result = statement.then((rows: any) => {
        return rows
    })
    return result
})

conditionSql.set(Condition.getConditionsExceptParents, async ([id]:any) => {
    let conditionIds = [id]
    var toExcept = new Set<number>()
    toExcept.add(id)
    while(true){
        var levelSet = new Set<number>()
        for(let i=0; i<conditionIds.length; i++){
            let id = conditionIds[i]

            let statement = knSqlite.select("conditionId").from("conditionParts").where({subConditionId:id})
            console.log(Condition.getConditionsExceptParents, statement.toSQL())
            let returnedIds = await statement.then((rows: any) => {
                console.log("rows",rows)
                return rows.map((row:any) => {
                    return row.conditionId
                })
            })
            console.log("returnedIds", returnedIds)
            returnedIds.forEach((id:any) => {
                levelSet.add(id)
                toExcept.add(id)
            })
        }
        console.log("levelSet", Array.from(levelSet))
        console.log("toExcept", Array.from(toExcept))
        console.log("conditionIds", conditionIds)
        if(levelSet.size == 0) {
            break
        } else {
            conditionIds = Array.from(levelSet)
        }
    }
    let exceptIds = Array.from(toExcept)
    let statement = knSqlite.select("id","name","description","assosiation").from("conditions").whereNotIn("id", exceptIds)
    console.log(Condition.getConditionsExceptParents, statement.toSQL())
    let result = statement.then((rows: any) => {
        return rows
    })
    return result
})

conditionSql.set(Condition.getConditionById, ([id]:any) => {
    let statement = knSqlite.select("id","name","description","assosiation").from("conditions").where({id})
    console.log(Condition.getConditionById, statement.toSQL())
    let result = statement.then((rows: any) => {
        return rows[0] || 0
    })
    return result
})

conditionSql.set(Condition.getPrevConditionId, ([id]:any) => {
    console.log("filterId",id)
    let statement = knSqlite.select("conditionId").from("conditionParts").where({subConditionId: id})
    console.log(Condition.getPrevConditionId, statement.toSQL())
    let result = statement.then((rows: any) => {
        return rows[0] || 0
    })
    return result
})

conditionSql.set(Condition.getSubConditions, ([conditionId]: any) => {
    let statement = knSqlite
        .select(
            "c.id",
            "f.id as partId",
            knSqlite.raw("'Filter' as type"),
            "f.name",
            "f.description")
        .from("conditions as c")
        .innerJoin("conditionParts as cp","cp.conditionId","=","c.id")
        .innerJoin("filters as f","cp.filterId","=","f.id")
        .where("c.id", conditionId)
        .union([
            knSqlite
                .select(
                    "c.id",
                    "sc.id as partId",
                    knSqlite.raw("'Condition' as type"),
                    "sc.name",
                    "sc.description")
                .from("conditions as c")
                .innerJoin("conditionParts as cp","cp.conditionId","=","c.id")
                .innerJoin("conditions as sc","cp.subConditionId","=","sc.id")
                .where("c.id", conditionId)
        ])
    console.log(Condition.getSubConditions, statement.toSQL())
    let result = statement.then((rows: any) => {
        return rows
    })
    return result
})

conditionSql.set(Condition.addFilter, ([conditionId, filterId]: any) => {
    let toInsert = {
        filterId: filterId,
        conditionId: conditionId,
        subConditionId: null
    }
    knSqlite.transaction(function(trx) {
        let statement = knSqlite.insert(toInsert).into("conditionParts")
        statement
        .transacting(trx)
        .then(trx.commit)
        console.log(Condition.addFilter, statement.toSQL())
    })
    return
})

conditionSql.set(Condition.addSubCondition, ([conditionId, subConditionId]: any) => {
    let toInsert = {
        filterId: null,
        conditionId: conditionId,
        subConditionId: subConditionId
    }
    knSqlite.transaction(function(trx) {
        let statement = knSqlite.insert(toInsert).into("conditionParts")
        statement
        .transacting(trx)
        .then(trx.commit)
        console.log(Condition.addSubCondition, statement.toSQL())
    })
    return
})

conditionSql.set(Condition.insertCondition, async ([condition]: any) => {
    let toInsert = condition
    delete toInsert.id
    const trx = await knSqlite.transaction();
    await trx.insert(toInsert).into("conditions")
    let [returnId] = await trx.raw("SELECT last_insert_rowid() as 'id'")
    await trx.commit()

    let newId = returnId.id
    return newId
})


conditionSql.set(Condition.copyCondition, async ([id]: any) => {
    let processedIds = [id]
    while(true){
        var levelSet = new Set<number>()
        for(let i=0; i<processedIds.length; i++){
            let conditionId = processedIds[i]
            //copy condition main data
            let toCopy = await processSql(Condition.getConditionById,[conditionId])
            console.log("toCopy",toCopy)
            delete toCopy.id
            let newConditionId = await processSql(Condition.insertCondition, [toCopy])
            console.log("newConditionId",newConditionId)
            //adding references on filters
            let filtStatement = knSqlite
                .select("f.id")
                .from("conditions as c")
                .innerJoin("conditionParts as cp","cp.conditionId","=","c.id")
                .innerJoin("filters as f","cp.filterId","=","f.id")
                .where("c.id", id)
            console.log(filtStatement.toSQL())
            let subFilters = await filtStatement.then((rows: any) => {
                return rows.map((row:any) => {
                    return row.id
                })
            })
            console.log("subFilters",subFilters)
            for(let j=0; j<subFilters.length; j++){
                let filterId = subFilters[j]
                await processSql(Condition.addFilter,[newConditionId, filterId])
            }
            // get next processed Subconditions
            let condStatement = knSqlite
                .select("sc.id")
                .from("conditions as c")
                .innerJoin("conditionParts as cp","cp.conditionId","=","c.id")
                .innerJoin("conditions as sc","cp.subConditionId","=","sc.id")
                .where("c.id", conditionId)
            console.log(condStatement.toSQL())
            let subConditions = await condStatement.then((rows: any) => {
                return rows.map((row:any) => {
                    return row.id
                })
            })
            console.log("subConditions",subConditions)
            for(let k=0; k<subConditions.length; k++){
                let conditionId = subConditions[k]
                levelSet.add(conditionId)
            }
        }
        if(levelSet.size == 0) {
            break
        } else {
            processedIds = Array.from(levelSet)
        }
    }
    return
})

conditionSql.set(Condition.updateCondition, ([condition]: any) => {
    let id = condition.id
    let toUpdate = condition
    delete toUpdate.id
    console.log(toUpdate)
    knSqlite.transaction(function(trx) {
        let statement = knSqlite("conditions").where({id}).update(toUpdate)
        statement
        .transacting(trx)
        .then(trx.commit)
        console.log(Condition.updateCondition, statement.toSQL())
    })
    return
})

conditionSql.set(Condition.removeFilter, ([conditionId, filterId]: any) => {
    // let id = conditionId
    knSqlite.transaction(function(trx) {
        console.log(conditionId)
        let statement = knSqlite("conditionParts").where({filterId, conditionId}).delete()
        statement
        .transacting(trx)
        .then(trx.commit)
        console.log(Condition.removeFilter, statement.toSQL())
    })
    return
})

conditionSql.set(Condition.removeCondition, ([conditionId, subCondId]: any) => {
    // let id = conditionId
    knSqlite.transaction(function(trx) {
        console.log(conditionId)
        let statement = knSqlite("conditionParts").where({subConditionId:subCondId, conditionId}).delete()
        statement
        .transacting(trx)
        .then(trx.commit)
        console.log(Condition.removeCondition, statement.toSQL())
    })
    return
})

conditionSql.set(Condition.deleteCondition, ([conditionId]: any) => {
    let id = conditionId
    knSqlite.transaction(function(trx) {
        console.log(conditionId)
        let statement = knSqlite("conditionParts").where({subConditionId:id}).delete()
        statement
        .transacting(trx)
        .then(trx.commit)
        console.log(Condition.deleteCondition, statement.toSQL())
    })
    knSqlite.transaction(function(trx) {
        console.log(conditionId)
        let statement = knSqlite("conditionParts").where({conditionId:id}).delete()
        statement
        .transacting(trx)
        .then(trx.commit)
        console.log(Condition.deleteCondition, statement.toSQL())
    })
    knSqlite.transaction(function(trx) {
        console.log(conditionId)
        let statement = knSqlite("conditions").where({id}).delete()
        statement
        .transacting(trx)
        .then(trx.commit)
        console.log(Condition.deleteCondition, statement.toSQL())
    })
    return
})

export {conditionSql}