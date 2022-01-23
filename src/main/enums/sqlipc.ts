export enum Folder {
    getFolders = "folder:getFolders",
    getFolderById = "folder:getFolderById",
    insertFolder = "folder:insertFolder",
    updateFolder = "folder:updateFolder",
    deleteFolder = "folder:deleteFolder",
    copyFolder = "folder:copyFolder"
}

export enum Filter {
    getFilters = "filter:getFilters",
    getFilterById = "filter:getFilterById",
    getPrevConditionId = "filter:getPrevConditionId",
    insertFilter = "filter:insertFilter",
    updateFilter = "filter:updateFilter",
    deleteFilter = "filter:deleteFilter",
    copyFilter = "filter:copyFilter"
}

export enum Action {
    getActions = "action:getActions",
    getActionById = "action:getActionById",
    insertAction = "action:insertAction",
    updateAction = "action:updateAction",
    deleteAction = "action:deleteAction",
    copyAction = "action:copyAction"
}

export enum Timetable {
    getTimetables = "timetable:getTimetables",
    getTimetableById = "timetable:getTimetableById",
    insertTimetable = "timetable:insertTimetable",
    updateTimetable = "timetable:updateTimetable",
    deleteTimetable = "timetable:deleteTimetable",
    copyTimetable = "timetable:copyTimetable"
}

export enum Rule {
    getRulesForSchedule = "rule:getRulesForSchedule",
    getRules = "rule:getRules",
    getRuleById = "rule:getRuleById",
    insertRule = "rule:insertRule",
    updateRule = "rule:updateRule",
    deleteRule = "rule:deleteRule",
    copyRule = "rule:copyRule",
    formRule = "rule:formRule"
}

export enum Condition {
    getConditions = "condition:getConditions",
    getConditionsExceptId = "condition:getConditionsExceptId",
    getConditionsExceptParents = "condition:getConditionsExceptParents",
    getConditionById = "condition:getConditionById",
    getPrevConditionId = "condition:getPrevConditionId",
    getSubConditions = "condition:getSubConditions",
    removeFilter = "condition:removeFilter",
    removeCondition = "condition:removeCondition",
    addFilter = "condition:addFilter",
    addSubCondition = "condition:addSubCondition",
    insertCondition = "condition:insertCondition",
    insertSubCondition = "condition:insertSubCondition",
    updateCondition = "condition:updateCondition",
    copyCondition = "condition:copyCondition",
    deleteCondition = "condition:deleteCondition"
}