const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    runSql(...args) {
      return ipcRenderer.invoke('run-sql', args)
    },
    fileDialog() {
      return ipcRenderer.invoke('file-dialog', null)
    },
    ruleApply(arg){
      return ipcRenderer.invoke('rule-apply', arg)
    },
    setSchedule(...args) {
      return ipcRenderer.invoke('set-schedule', args)
    },
    removeSchedule(arg) {
      return ipcRenderer.invoke('remove-schedule', arg)
    },
  },
});
