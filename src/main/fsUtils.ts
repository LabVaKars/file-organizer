import { dialog } from "electron";

export function getFolderPath(){
    return dialog.showOpenDialog({properties: ['openDirectory']})
}