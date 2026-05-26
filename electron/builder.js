// ملف تكوين Electron Builder
const path = require('path');

module.exports = {
  // معرف التطبيق
  appId: 'com.desktop.bookingapp',
  
  // اسم المنتج
  productName: 'نظام إدارة الحجوزات والحسابات',
  
  // وصف التطبيق
  description: 'تطبيق سطح مكتب لإدارة الحجوزات والحسابات',
  
  // مؤلف التطبيق
  author: {
    name: 'المطور',
    email: 'developer@example.com',
  },
  
  // حقوق النشر
  copyright: `حقوق النشر © ${new Date().getFullYear()}`,
  
  // الملفات المراد تضمينها في الحزمة
  files: [
    'dist/**/*',
    'electron/**/*',
    'package.json',
  ],
  
  // المجلدات
  directories: {
    output: 'release',
    app: '.',
    buildResources: 'public',
  },
  
  // خيارات Windows
  win: {
    target: ['nsis'],
    icon: path.resolve(__dirname, '../public/calendar-icon.svg'),
    artifactName: '${productName}-${version}-setup.${ext}',
  },
  
  // خيارات macOS
  mac: {
    target: ['dmg'],
    icon: path.resolve(__dirname, '../public/calendar-icon.svg'),
    category: 'public.app-category.business',
  },
  
  // خيارات Linux
  linux: {
    target: ['AppImage', 'deb', 'rpm'],
    icon: path.resolve(__dirname, '../public/calendar-icon.svg'),
    category: 'Office',
  },
  
  // خيارات NSIS (برنامج التثبيت لنظام Windows)
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: 'نظام إدارة الحجوزات والحسابات',
    installerIcon: path.resolve(__dirname, '../public/calendar-icon.svg'),
    uninstallerIcon: path.resolve(__dirname, '../public/calendar-icon.svg'),
    installerHeaderIcon: path.resolve(__dirname, '../public/calendar-icon.svg'),
  },
  
  // خيارات DMG (برنامج التثبيت لنظام macOS)
  dmg: {
    icon: path.resolve(__dirname, '../public/calendar-icon.svg'),
    title: '${productName} ${version}',
  },
  
  // خيارات AppImage (برنامج التثبيت لنظام Linux)
  appImage: {
    license: path.resolve(__dirname, '../LICENSE'),
  },
  
  // خيارات النشر
  publish: {
    provider: 'github',
    owner: 'yourusername',
    repo: 'yourrepo',
    releaseType: 'release',
  },
};