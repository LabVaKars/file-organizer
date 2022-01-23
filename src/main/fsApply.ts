import { Rule } from "./enums/sqlipc"
import { getSizeMultiplier, getTimeMultiplier } from "./fsUtils"
import { processSql } from "./models"

const fs = require('fs')
const path = require('path')


// let ruleFormat = {
//     source: "./test",
//     destination: "./destination",
//     includeSubfolders: true,
//     action: "copy",
//     condition: {
//         assosiation: "AND",
//         conditions:[
//             {
//                 assosiation: "AND",
//                 conditions: [],
//                 filters: [
//                     {
//                         field: "fileSize",
//                         comparator: "more",
//                         value: {
//                             Size: "1",
//                             SizeMeasure: "KB"
//                         }
//                     },
//                     {
//                         field: "fileSize",
//                         comparator: "less",
//                         value: {
//                             Size: "5",
//                             SizeMeasure: "KB"
//                         }
//                     }
//                 ]

//             }
//         ],
//         filters:[
//             {
//                 field: "fileName",
//                 comparator: "do_contain",
//                 value: {
//                     Text: "index"
//                 }
//             }
//         ]
//     }
// }


// let obj = {}
// toExpressionJson(ruleFormat.condition,obj)
// console.log(JSON.stringify(obj))




function getField(filePath:any, {field}:any){
    console.log(filePath)
    let selectedField
    if(field == "fileName") {
        selectedField = getFileName(filePath)
    }
    if(field == "fileExtension") {
        selectedField = getFileExt(filePath)
    }
    if(field == "fileSize") {
        selectedField = getFileSize(filePath)
    }
    if(field == "createdTime") {
        selectedField = getBirthTime(filePath)
    }
    if(field == "changedTime") {
        selectedField = getChangedTime(filePath)
    }
    if(field == "accessedTime") {
        selectedField = getAccessedTime(filePath)
    }
    if(field == "modifiedTime") {
        selectedField = getModifiedTime(filePath)
    }
    return selectedField
}

function getValue(filePath:any, {field, comparator, value}:any){
    let comparedValue
    if(["createdTime","changedTime","accessedTime","modifiedTime"].includes(field)){
        let [_cmp, abs, time] = comparator.split("_")
        if(abs == "abs"){
            if(time == "time"){
                comparedValue = new Date(value["AbsDate"]+" "+value["AbsTime"])
            } else if (time == "now"){
                comparedValue = Date.now()
            }
        }
        if(abs == "rel"){
            let absDate = new Date()
            if(time == "time"){
                absDate = new Date(value["RelDate"]+" "+value["RelTime"])
            } else if(time == "now"){
                absDate = new Date()
            }
            let timeMultiplier = getTimeMultiplier(value["RelDifMeasure"])
            let dateChange = (value["RelDirection"] == "before")
                ? -value["RelDif"] * timeMultiplier
                : value["RelDif"] * timeMultiplier
            comparedValue = new Date(absDate.getTime()+dateChange)
        }
    }
    if(["fileName", "fileExtension"].includes(field)){
        comparedValue = value["Text"]
    }
    if(["fileSize"].includes(field)){
        comparedValue = value["Size"] * getSizeMultiplier(value["SizeMeasure"])
    }
    return comparedValue
}

function getComparator(filePath:any, {field,comparator}:any){
    let compareFn = (fieldValue:any, value:any) => {return false}
    if(["createdTime","changedTime","accessedTime","modifiedTime"].includes(field)){
        let [cmp, _abs, _time] = comparator.split("_")
        if(cmp == "more"){
            compareFn = (fieldValue:any, value:any) => {
                return fieldValue > value
            }
        } else if(cmp == "less"){
            compareFn = (fieldValue:any, value:any) => {
                return fieldValue < value
            }
        }
    }
    if(['fileSize'].includes(field)){
        if(comparator == "more"){
            compareFn = (fieldValue:any, value:any) => {
                return fieldValue > value
            }
        } else if(comparator == "less"){
            compareFn = (fieldValue:any, value:any) => {
                return fieldValue < value
            }
        }
    }
    if(['fileName', 'fileExtension'].includes(field)){
        let [neg, fld] = comparator.split('_')
        if(fld == "start"){
            if(neg == "do"){
                compareFn = (fieldValue:any, value:any) => {
                    return (new RegExp("^"+value)).test(fieldValue)
                }
            } else if (neg == "dont"){
                compareFn = (fieldValue:any, value:any) => {
                    return !(new RegExp("^"+value)).test(fieldValue)
                }
            }
        }
        if(fld == "end"){
            if(neg == "do"){
                compareFn = (fieldValue:any, value:any) => {
                    return (new RegExp(value+"$")).test(fieldValue)
                }
            } else if (neg == "dont"){
                compareFn = (fieldValue:any, value:any) => {
                    return !(new RegExp(value+"$")).test(fieldValue)
                }
            }
        }
        if(fld == "contains"){
            if(neg == "do"){
                compareFn = (fieldValue:any, value:any) => {
                    return (new RegExp(value)).test(fieldValue)
                }
            } else if (neg == "dont"){
                compareFn = (fieldValue:any, value:any) => {
                    return !(new RegExp(value)).test(fieldValue)
                }
            }
        }
        if(fld == "regexp"){
            if(neg == "do"){
                compareFn = (fieldValue:any, value:any) => {
                    return (new RegExp(value)).test(fieldValue)
                }
            } else if (neg == "dont"){
                compareFn = (fieldValue:any, value:any) => {
                    return !(new RegExp(value)).test(fieldValue)
                }
            }
        }
    }
    return compareFn
}

function getFullFileName(filePath:any){
    let basename = path.basename(filePath)
    return basename
}

function getFileName(filePath:any){
    let extname = path.extname(filePath)
    let basename = path.basename(filePath, extname)
    return basename
}

function getFileExt(filePath:any){
    let extname = path.extname(filePath)
    if(extname && extname[0] == ".") extname = extname.substr(1)
    return extname
}

function getAccessedTime(filePath:any){
    return fs.statSync(filePath).atime
}

function getChangedTime(filePath:any){
    return fs.statSync(filePath).ctime
}

function getModifiedTime(filePath:any){
    return fs.statSync(filePath).mtime
}

function getBirthTime(filePath:any){
    return fs.statSync(filePath).birthtime
}

function getFileSize(filePath:any){
    return fs.statSync(filePath).size
}

function applyFilter(filePath:any, filter:any){
    console.log("filter",filter)
    let field = getField(filePath, filter)
    console.log("field",field)
    let compareFn = getComparator(filePath, filter)
    console.log("compareFn",compareFn)
    let value = getValue(filePath, filter)
    console.log("value",value)
    return compareFn(field, value)
}

export function applyCondition(filePath:any, condition:any){
    let boolExprTree = {}
    toExpressionJson(condition, boolExprTree, filePath)
    console.log("condition",JSON.stringify(boolExprTree))
    return evaluate(boolExprTree)
}

function toExpressionJson(con:any, obj:any, filePath:any){
    if(con.filters.length > 0 || con.conditions.length > 0){
        obj[con.assosiation] = []
    }
    for(let i = 0; i<con.conditions.length; i++){
        if(con.conditions[i].filters.length > 0 || con.conditions[i].conditions.length > 0){
            obj[con.assosiation].push({})
            toExpressionJson(con.conditions[i], obj[con.assosiation][i], filePath)
        }
    }
    for(let j = 0; j<con.filters.length; j++){
        // obj[con.assosiation].push(con.filters[j].value)
        obj[con.assosiation].push(applyFilter(filePath, con.filters[j]))
    }
}

function evaluate({ OR, AND }:any) {
    if (OR)
        return OR.some((c:any) => typeof c === 'object' ? evaluate(c) : c)
    if (AND)
        return AND.every((c:any) => typeof c === 'object' ? evaluate(c) : c)
}



const getDirFiles = function(dirPath:any) {
    let files = fs.readdirSync(dirPath)

    let arrayOfFiles:any = []

    files.forEach(function(file:any) {
        if (fs.statSync(dirPath + "/" + file).isFile()) {
            arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
        }
    })

    return arrayOfFiles
}

const getAllFiles = function(dirPath:any, arrayOfFiles:any) {
    let files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []

    for (let file of files) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file))
        }
    }

    return arrayOfFiles
}

export function applyRule(rule:any){
    console.log(rule)
    let folderPath = rule["source"]
    let includeSubfolders = rule["includeSubfolders"]
    let files = includeSubfolders
        ? getAllFiles(folderPath, [])
        : getDirFiles(folderPath)
    let acceptedFiles:any = []
    files.forEach((file:any) => {
        if(applyCondition(file,rule["condition"])){
            acceptedFiles.push(file)
        }
    })
    console.log("acceptedFiles", acceptedFiles)
    acceptedFiles.forEach((file:any) => {
        if(rule["action"] == "copy"){
            console.log("Copying file")
            fs.copyFileSync(file, path.join(rule["destination"], getFullFileName(file)))
        } else if(rule["action"] == "move") {
            console.log("Moving file")
            fs.renameSync(file, path.join(rule["destination"], getFullFileName(file)))
        }
    })
    return true
}

export async function applyFormedRule(ruleId:number) {
  let ruleForm = await processSql(Rule.formRule, [ruleId])
  applyRule(ruleForm)
}

// let normalFile = path.resolve("./test/nested.txt")

// let srcFolder = path.resolve(ruleFormat.source)
// let destination = path.resolve(ruleFormat.destination)

// let files = []

// console.log("srcFolder",srcFolder)

// if(ruleFormat.includeSubfolders){
//     files = getAllFiles(srcFolder, [])
// } else {
//     files = getDirFiles(srcFolder)
// }

// console.log("files", files)

// let accepted = []

// for(let filePath of files){
//     console.log(filePath)
//     if(applyCondition(filePath, ruleFormat.condition)){
//         accepted.push(filePath)
//     }
// }

// console.log("accepted", accepted)

