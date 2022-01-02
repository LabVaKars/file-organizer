import { configureStore } from "@reduxjs/toolkit"
import UsedFoldersTableReducer from "tg_reducers/UsedFoldersTableReducer"
import UsedFiltersTableReducer from "tg_reducers/UsedFiltersTableReducer"
import UsedConditionsTableReducer from "tg_reducers/UsedConditionsTableReducer"
import SubConditionsTableReducer from "tg_reducers/SubConditionsTableReducer"
import SelectConditionsTableReducer from "tg_reducers/SelectConditionsTableReducer"
import SelectFiltersTableReducer from "tg_reducers/SelectFiltersTableReducer"
import UsedConditionsPageReducer from "tg_reducers/UsedConditionsPageReducer"
import UsedFiltersPageReducer from "tg_reducers/UsedFiltersPageReducer"
import UsedFoldersPageReducer from "tg_reducers/UsedFoldersPageReducer"
import OpenedModalReducer  from "tg_reducers/OpenedModalReducer"

export const store = configureStore({
    reducer: {
        usedFolders: UsedFoldersTableReducer,
        usedFilters: UsedFiltersTableReducer,
        usedConditions: UsedConditionsTableReducer,
        subConditions: SubConditionsTableReducer,
        selectConditions: SelectConditionsTableReducer,
        selectFilters: SelectFiltersTableReducer,
        usedConditionsPage: UsedConditionsPageReducer,
        usedFiltersPage: UsedFiltersPageReducer,
        usedFoldersPage: UsedFoldersPageReducer,
        openedModal: OpenedModalReducer
    },
    devTools: true
})