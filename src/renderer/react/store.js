import { configureStore } from "@reduxjs/toolkit"
import FavouriteFolderTableReducer from "tg_reducers/FavouriteFolderTableReducer"
import  TableFormReducer  from "tg_reducers/TableFormReducer"

export const store = configureStore({
    reducer: {favFolders: FavouriteFolderTableReducer},
    devTools: true
})