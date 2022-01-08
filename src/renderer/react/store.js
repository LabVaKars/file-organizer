import { configureStore } from "@reduxjs/toolkit"
import UsedConditionsTableReducer from "tg_reducers/UsedConditionsTableReducer"
import UsedFiltersTableReducer from "tg_reducers/UsedFiltersTableReducer"
import UsedFoldersTableReducer from "tg_reducers/UsedFoldersTableReducer"
import UsedActionsTableReducer from "tg_reducers/UsedActionsTableReducer"
import UsedTimetablesTableReducer from "tg_reducers/UsedTimetablesTableReducer"
import UsedRulesTableReducer from "tg_reducers/UsedRulesTableReducer"
import SubConditionsTableReducer from "tg_reducers/SubConditionsTableReducer"
import SelectConditionsTableReducer from "tg_reducers/SelectConditionsTableReducer"
import SelectFiltersTableReducer from "tg_reducers/SelectFiltersTableReducer"
import SelectFoldersTableReducer from "tg_reducers/SelectFoldersTableReducer"
import SelectActionsTableReducer from "tg_reducers/SelectActionsTableReducer"
import SelectTimetablesTableReducer from "tg_reducers/SelectTimetablesTableReducer"
import UsedConditionsPageReducer from "tg_reducers/UsedConditionsPageReducer"
import UsedFiltersPageReducer from "tg_reducers/UsedFiltersPageReducer"
import UsedFoldersPageReducer from "tg_reducers/UsedFoldersPageReducer"
import UsedActionsPageReducer from "tg_reducers/UsedActionsPageReducer"
import UsedTimetablesPageReducer from "tg_reducers/UsedTimetablesPageReducer"
import UsedRulesPageReducer from "tg_reducers/UsedRulesPageReducer"
import OpenedModalReducer  from "tg_reducers/OpenedModalReducer"

export const store = configureStore({
    reducer: {
        usedConditions: UsedConditionsTableReducer,
        usedFolders: UsedFoldersTableReducer,
        usedFilters: UsedFiltersTableReducer,
        usedActions: UsedActionsTableReducer,
        usedTimetables: UsedTimetablesTableReducer,
        usedRules: UsedRulesTableReducer,
        subConditions: SubConditionsTableReducer,
        selectConditions: SelectConditionsTableReducer,
        selectFilters: SelectFiltersTableReducer,
        selectFolders: SelectFoldersTableReducer,
        selectActions: SelectActionsTableReducer,
        selectTimetables: SelectTimetablesTableReducer,
        usedConditionsPage: UsedConditionsPageReducer,
        usedFiltersPage: UsedFiltersPageReducer,
        usedFoldersPage: UsedFoldersPageReducer,
        usedActionsPage: UsedActionsPageReducer,
        usedTimetablesPage: UsedTimetablesPageReducer,
        usedRulesPage: UsedRulesPageReducer,
        openedModal: OpenedModalReducer
    },
    devTools: true
})