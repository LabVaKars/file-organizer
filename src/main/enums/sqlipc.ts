export enum Folder {
    getFolders = "folder:getFolders",
    getFolderById = "folder:getFolderById",
    insertFolder = "folder:insertFolder",
    updateFolder = "folder:updateFolder",
    deleteFolder = "folder:deleteFolder"
}

export enum Filter {
    getFilters = "filter:getFilters",
    getFilterById = "filter:getFilterById",
    getPrevConditionId = "filter:getPrevConditionId",
    insertFilter = "filter:insertFilter",
    updateFilter = "filter:updateFilter",
    deleteFilter = "filter:deleteFilter"
}

export enum Condition {
    getConditions = "condition:getConditions",
    getConditionsExceptId = "condition:getConditionsExceptId",
    getConditionsExceptParents = "condition:getConditionsExceptParents",
    getConditionById = "condition:getConditionById",
    getPrevConditionId = "condition:getPrevConditionId",
    getSubConditions = "condition:getSubConditions",
    addFilter = "condition:addFilter",
    addSubCondition = "condition:addSubCondition",
    insertCondition = "condition:insertCondition",
    insertSubCondition = "condition:insertSubCondition",
    updateCondition = "condition:updateCondition",
    copyCondition = "condition:copyCondition",
    deleteCondition = "condition:deleteCondition"
}