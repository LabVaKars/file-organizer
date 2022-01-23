import { Rule, Timetable } from "./enums/sqlipc"
import { applyFormedRule } from "./fsApply"
import { getTimeMultiplier } from "./fsUtils"
import { processSql } from "./models"

let activeSchedules = new Map()
let waitingSchedules = new Map()

function getStartDate(timetable:any){
    let startDate = timetable.startDate
    let startTime = timetable.startTime
    return new Date(startDate + " " + startTime)
}

function getFrequency(timetable:any){
    let frequencyNum = timetable.frequency
    let frequencyMult = getTimeMultiplier(timetable.frequencyMeasure)
    return frequencyNum * frequencyMult
}

function getNthSchedule(startTime:Date, frequency:any, n:number){
    return new Date(startTime.getTime()+frequency*n)
}

export async function scheduleRule(timetableId:any, ruleId:number){
    console.log("Scheduling rule by id: "+ ruleId)
    let timetable = await processSql(Timetable.getTimetableById, [timetableId])
    let startTime = getStartDate(timetable)
    let frequencyMillis:number = getFrequency(timetable)
    let now = new Date()
    let scheduleDate
    if (startTime < now) {
        let skipCnt = Math.ceil((now.getTime() - startTime.getTime()) / frequencyMillis)
        scheduleDate = getNthSchedule(startTime, frequencyMillis, skipCnt)
    } else {
        scheduleDate = getNthSchedule(startTime, frequencyMillis, 0)
    }
    let millisTillSchedule = scheduleDate.getTime() - now.getTime()
    waitingSchedules.set(ruleId, setTimeout(() => {
            console.log("First schedule call")
            applyFormedRule(ruleId)
            activeSchedules.set(ruleId, setInterval(() => {
                console.log("Repetative schedule call")
                applyFormedRule(ruleId)
            },frequencyMillis))
        },millisTillSchedule)
    )
}

export function removeSchedule(ruleId:number) {
    let timeoutId = null
    if(timeoutId = waitingSchedules.get(ruleId)){
        clearTimeout(timeoutId)
        waitingSchedules.delete(ruleId)
    }
    timeoutId = null
    if(timeoutId = activeSchedules.get(ruleId)){
        clearInterval(timeoutId)
        activeSchedules.delete(ruleId)
    }
}


export async function initSchedules(){
    let rules = await processSql(Rule.getRulesForSchedule, [])
    console.log(rules)
    rules.forEach((r:any) => {
        if(r.active == 1) {
            scheduleRule(r.timetableId, r.id)
        }
    })
    return
}