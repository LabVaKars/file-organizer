
export function useSql(){
    return window.electron.ipcRenderer.runSql
}

export function useFileDialog(){
    return window.electron.ipcRenderer.fileDialog
}