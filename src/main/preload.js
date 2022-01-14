const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    // myPing() {
    //   ipcRenderer.send('ipc-example', 'ping');
    // },
    runSql(...args) {
      return ipcRenderer.invoke('run-sql', args)
    },
    ruleApply(arg){
      return ipcRenderer.invoke('rule-apply', arg)
    }
  },
});
