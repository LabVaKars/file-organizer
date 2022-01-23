
export function useSql(){
    return window.electron.ipcRenderer.runSql
}

export function useFileDialog(){
    return window.electron.ipcRenderer.fileDialog
}

export function useRuleApply(){
    return window.electron.ipcRenderer.ruleApply
}

export function useSetSchedule(){
    return window.electron.ipcRenderer.setSchedule
}

export function useRemoveSchedule(){
    return window.electron.ipcRenderer.removeSchedule
}

export function filterValueToJson(data: any){
    let jsonValue:any = {}
    if(['modifiedTime','createdTime','accessedTime'].includes(data._field)){
        if(['more_abs_time','less_abs_time'].includes(data._comparator)){
            jsonValue["AbsDate"] = data._valueAbsDate
            jsonValue["AbsTime"] = data._valueAbsTime
        }
        if(['more_rel_time','less_rel_time', 'more_rel_now','less_rel_now'].includes(data._comparator)){
            jsonValue["RelDif"] = data._valueRelDif
            jsonValue["RelDifMeasure"] = data._valueRelDifMeasure
            jsonValue["RelDirection"] = data._valueRelDirection
            if(['more_rel_time','less_rel_time'].includes(data._comparator)){
                jsonValue["RelTime"] = data._valueRelTime
                jsonValue["RelDate"] = data._valueRelDate
            }
        }
    }
    if(['fileName', 'fileExtension'].includes(data._field)){
        jsonValue["Text"] = data._valueText
    }
    if(['fileSize'].includes(data._field)){
        jsonValue["Size"] = data._valueSize
        jsonValue["SizeMeasure"] = data._valueSizeMeasure
    }
    return JSON.stringify(jsonValue)
}

export function jsonToFilterValue(json: any){
    let jsonValue:any = {}

    jsonValue = JSON.parse(json)

    return jsonValue
}