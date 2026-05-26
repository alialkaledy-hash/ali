// ملف تكوين Electron Forge
const path = require('path');

module.exports = {
  // تكوين Packager
  packagerConfig: {
    name: 'نظام إدارة الحجوزات والحسابات',
    executableName: 'booking-accounting-app',
    icon: path.resolve(__dirname, '../public/calendar-icon.svg'),
    asar: true,
    ignore: [
      /^\/src/,
      /^\/node_modules/,
      /^\/\.git/,
      /^\/\.vscode/,
      /^\/\.bolt/,
    ],
  },
  
  // تكوين إعادة البناء
  rebuildConfig: {},
  
  // صانعي الحزم
  makers: [
    // صانع حزم Windows
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'BookingAccountingApp',
        setupIcon: path.resolve(__dirname, '../public/calendar-icon.svg'),
      },
    },
    // صانع حزم ZIP (لنظام macOS)
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    // صانع حزم DEB (لنظام Linux)
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: path.resolve(__dirname, '../public/calendar-icon.svg'),
        },
      },
    },
    // صانع حزم RPM (لنظام Linux)
    {
      name: '@electron-forge/maker-rpm',
      config: {
        options: {
          icon: path.resolve(__dirname, '../public/calendar-icon.svg'),
        },
      },
    },
  ],
  
  // البرامج الإضافية
  plugins: [
    // برنامج Vite الإضافي
    {
      name: '@electron-forge/plugin-vite',
      config: {
        // تكوين البناء
        build: [
          {
            // نقطة الدخول للعملية الرئيسية
            entry: path.resolve(__dirname, 'main.js'),
            config: path.resolve(__dirname, '../vite.config.ts'),
          },
        ],
        // تكوين العارض
        renderer: [
          {
            name: 'main_window',
            config: path.resolve(__dirname, '../vite.config.ts'),
          },
        ],
      },
    },
  ],
  
  // تكوين النشر
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'yourusername',
          name: 'yourrepo',
        },
        prerelease: false,
      },
    },
  ],
};