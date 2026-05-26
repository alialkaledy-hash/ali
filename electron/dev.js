// ملف تشغيل Electron في وضع التطوير
const { spawn } = require('child_process');
const electron = require('electron');
const path = require('path');
const waitOn = require('wait-on');

// تكوين خادم التطوير
const DEV_SERVER_URL = 'http://localhost:5173';

// بدء خادم التطوير
const startDevServer = () => {
  const viteProcess = spawn('npm', ['run', 'dev'], {
    shell: true,
    stdio: 'inherit',
    env: process.env,
  });

  viteProcess.on('error', (err) => {
    console.error('فشل في بدء خادم التطوير:', err);
    process.exit(1);
  });

  return viteProcess;
};

// بدء تطبيق Electron
const startElectron = () => {
  const electronProcess = spawn(electron, [path.join(__dirname, 'main.js')], {
    shell: true,
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'development',
      ELECTRON_START_URL: DEV_SERVER_URL,
    },
  });

  electronProcess.on('error', (err) => {
    console.error('فشل في بدء Electron:', err);
    process.exit(1);
  });

  electronProcess.on('close', () => {
    process.exit(0);
  });

  return electronProcess;
};

// الدالة الرئيسية
const main = async () => {
  try {
    console.log('بدء خادم التطوير...');
    const viteProcess = startDevServer();

    console.log(`انتظار خادم التطوير على ${DEV_SERVER_URL}...`);
    await waitOn({ resources: [DEV_SERVER_URL], timeout: 30000 });

    console.log('بدء تطبيق Electron...');
    const electronProcess = startElectron();

    // إغلاق العمليات عند الخروج
    const cleanup = () => {
      if (viteProcess && !viteProcess.killed) {
        viteProcess.kill();
      }
      if (electronProcess && !electronProcess.killed) {
        electronProcess.kill();
      }
    };

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
    process.on('exit', cleanup);
  } catch (err) {
    console.error('حدث خطأ:', err);
    process.exit(1);
  }
};

// تنفيذ الدالة الرئيسية
main();