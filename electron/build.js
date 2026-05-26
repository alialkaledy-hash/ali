// ملف بناء تطبيق Electron للإنتاج
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const builder = require('electron-builder');

// مسار مجلد التوزيع
const DIST_PATH = path.join(__dirname, '../dist');

// مسار مجلد الإصدار
const RELEASE_PATH = path.join(__dirname, '../release');

// بناء تطبيق الويب
const buildWebApp = () => {
  return new Promise((resolve, reject) => {
    console.log('بناء تطبيق الويب...');
    const buildProcess = spawn('npm', ['run', 'build'], {
      shell: true,
      stdio: 'inherit',
      env: process.env,
    });

    buildProcess.on('error', (err) => {
      console.error('فشل في بناء تطبيق الويب:', err);
      reject(err);
    });

    buildProcess.on('close', (code) => {
      if (code === 0) {
        console.log('تم بناء تطبيق الويب بنجاح!');
        resolve();
      } else {
        console.error(`فشل في بناء تطبيق الويب مع رمز الخروج: ${code}`);
        reject(new Error(`فشل في بناء تطبيق الويب مع رمز الخروج: ${code}`));
      }
    });
  });
};

// التحقق من وجود مجلد التوزيع
const checkDistFolder = () => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(DIST_PATH)) {
      console.error('مجلد التوزيع غير موجود. يرجى تشغيل `npm run build` أولاً.');
      reject(new Error('مجلد التوزيع غير موجود'));
      return;
    }

    const files = fs.readdirSync(DIST_PATH);
    if (files.length === 0) {
      console.error('مجلد التوزيع فارغ. يرجى تشغيل `npm run build` أولاً.');
      reject(new Error('مجلد التوزيع فارغ'));
      return;
    }

    resolve();
  });
};

// بناء تطبيق Electron
const buildElectronApp = async () => {
  console.log('بناء تطبيق Electron...');
  try {
    const result = await builder.build({
      config: require('./builder.js'),
    });
    console.log('تم بناء تطبيق Electron بنجاح!');
    console.log('مسارات الملفات الناتجة:');
    console.log(result);
    return result;
  } catch (err) {
    console.error('فشل في بناء تطبيق Electron:', err);
    throw err;
  }
};

// الدالة الرئيسية
const main = async () => {
  try {
    // بناء تطبيق الويب
    await buildWebApp();

    // التحقق من وجود مجلد التوزيع
    await checkDistFolder();

    // بناء تطبيق Electron
    await buildElectronApp();

    console.log(`تم بناء التطبيق بنجاح! يمكنك العثور على الملفات التنفيذية في مجلد: ${RELEASE_PATH}`);
  } catch (err) {
    console.error('فشل في بناء التطبيق:', err);
    process.exit(1);
  }
};

// تنفيذ الدالة الرئيسية
main();