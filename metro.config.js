const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const projectRoot = __dirname;
const libraryRoot = path.resolve(projectRoot, '../react-native-live-widgets');

/**
 * Cấu hình Metro Bundler cho LiveWidgetsExample
 * 1. Theo dõi (watch) thư mục thư viện cục bộ để hỗ trợ Fast Refresh khi sửa code thư viện.
 * 2. Ngăn trùng lặp (deduplicate) React và React Native giữa project và library.
 */
const config = {
  watchFolders: [libraryRoot],
  resolver: {
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
    ],
    extraNodeModules: {
      react: path.resolve(projectRoot, 'node_modules/react'),
      'react-native': path.resolve(projectRoot, 'node_modules/react-native'),
    },
    blockList: [
      new RegExp(`^${path.resolve(libraryRoot, 'node_modules/react')}(/.*)?$`),
      new RegExp(`^${path.resolve(libraryRoot, 'node_modules/react-native')}(/.*)?$`),
      new RegExp(`^${path.resolve(libraryRoot, 'node_modules/@react-native')}(/.*)?$`),
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
