// ملف preload.js يتم تنفيذه قبل تحميل صفحة الويب
// ويمكنه الوصول إلى كل من واجهات برمجة تطبيقات Node.js و DOM

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});

// يمكنك أيضًا إضافة واجهات برمجة تطبيقات مخصصة لاستخدامها في العملية المعروضة
// على سبيل المثال:
/*
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // أضف هنا أي وظائف تريد توفيرها للعملية المعروضة
  saveData: (data) => ipcRenderer.invoke('save-data', data),
  loadData: () => ipcRenderer.invoke('load-data')
});
*/