import { dialog } from "electron";

export function getFolderPath(){
    return dialog.showOpenDialog({properties: ['openDirectory']})
}


export function getTimeMultiplier(field:any){
    let timeMultiplier = 1000
    if(field == "second") {
        timeMultiplier = 1000
    } else
    if(field == "minute") {
        timeMultiplier = 60000
    } else
    if(field == "hour") {
        timeMultiplier = 3600000
    } else
    if(field == "day") {
        timeMultiplier = 86400000
    }
    return timeMultiplier
}

export function getTimeMultiplierSeconds(field:any){
    return getTimeMultiplier(field) / 1000
}

export function getSizeMultiplier(field:any){
    let sizeMultiplier = 1
    if(field == "B") {
        sizeMultiplier = 1
    } else
    if(field == "KB") {
        sizeMultiplier = 1024
    } else
    if(field == "MB") {
        sizeMultiplier = 1048576
    } else
    if(field == "GB") {
        sizeMultiplier = 1073741824
    }
    return sizeMultiplier
}