const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  writeToDisk: (filePath, content) => ipcRenderer.send('write-to-file', { filePath, content }),
  readFromDisk: (filePath) => ipcRenderer.send('read-from-disk', filePath),
  onWriteResponse: (callback) => ipcRenderer.on('write-to-file-res', (event, res) => callback(res)),
  onReadFromFile: (callback) => ipcRenderer.on('read-from-disk-res', (event, res) => callback(res))
});