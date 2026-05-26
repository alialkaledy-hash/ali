const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

// حافظ على مرجع عام للنافذة، وإلا قد يتم إغلاق النافذة
// تلقائيًا عندما يتم جمع كائن JavaScript.
let mainWindow;

function createWindow() {
  // إنشاء نافذة المتصفح.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../public/calendar-icon.svg')
  });

  // تحميل ملف index.html للتطبيق.
  // في وضع الإنتاج، سنستخدم الملفات المبنية من مجلد dist
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    // فتح أدوات المطور.
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '../dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // إزالة شريط القوائم
  mainWindow.setMenuBarVisibility(false);

  // تم استدعاؤه عند إغلاق النافذة.
  mainWindow.on('closed', function () {
    // إلغاء المرجع لكائن النافذة، عادة ستخزن النوافذ
    // في مصفوفة إذا كان تطبيقك يدعم نوافذ متعددة، هذا هو الوقت
    // الذي يجب فيه حذف العنصر المقابل.
    mainWindow = null;
  });
}

// يتم استدعاء هذه الطريقة عندما ينتهي Electron من
// التهيئة وجاهز لإنشاء نوافذ المتصفح.
// بعض واجهات برمجة التطبيقات يمكن استخدامها فقط بعد حدوث هذا الحدث.
app.on('ready', createWindow);

// اخرج عندما تكون جميع النوافذ مغلقة.
app.on('window-all-closed', function () {
  // في macOS من الشائع أن تظل التطبيقات وشريط القوائم الخاص بها
  // نشطة حتى يقوم المستخدم بالخروج صراحةً باستخدام Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // في macOS من الشائع إعادة إنشاء نافذة في التطبيق عندما
  // يتم النقر على أيقونة الإرساء والنوافذ الأخرى مغلقة.
  if (mainWindow === null) {
    createWindow();
  }
});

// في هذا الملف يمكنك تضمين بقية كود العملية الرئيسية الخاص بالتطبيق الخاص بك.
// يمكنك أيضًا وضعها في ملفات مختلفة وتضمينها هنا.