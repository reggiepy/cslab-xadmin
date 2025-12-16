import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs  from 'vite-plugin-commonjs'
import jsInJsxPlugin from './js-in-jsx.js'
import { resolve } from 'path';
import fs from 'fs';
import path from 'path'

const appDirectory = fs.realpathSync(process.cwd());
const pkg = require(path.resolve(appDirectory, 'package.json'))
const appName = pkg.name
const pkgName = appName.replace(/-(\w)/g, function(all, letter){
  return letter.toUpperCase();
 });

const makeExternalPredicate = (externalArr) => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})$`);
  return (id) => pattern.test(id);
};

const globals = {
  "antd": "antd",
  "@ant-design/icons": "icons",
  react: 'React',
  redux: 'Redux',
  'react-dom': 'ReactDOM',
  'react-dom/client': 'ReactDOMClient',
  'react-router': 'ReactRouter',
  'react-router-dom': 'ReactRouterDOM',
  "recoil": "Recoil",
  'react-redux': 'ReactRedux',
  'redux-saga': 'ReduxSaga',
  'jotai': 'jotai',
  'jotai/utils': 'jotaiUtils',
  'lodash': '_',
  "moment": "moment",
  'xadmin': 'xadmin',
  'xadmin-i18n': 'xadminI18n',
  'xadmin-ui': 'xadminUi',
  'xadmin-form': 'xadminForm',
  'xadmin-model': 'xadminModel'
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    jsxRuntime: 'classic'
  }), 
  commonjs({
    requireReturnsDefault: 'preferred'
  }), jsInJsxPlugin()], 
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(appDirectory, './src') // 将 @ 映射到项目根目录下的 src 文件夹
    }
  },
  build: {
    minify: 'terser',
    // 启用库模式
    lib: {
      // 入口文件，相当于您原来 Babel 处理的 src 目录的入口
      entry: resolve(appDirectory, '/src/index.js'),
      // 输出格式，对应原来的 lib, es, umd
      formats: ['es', 'cjs', 'umd'],
      // UMD 格式暴露的全局变量名（必须）
      name: pkgName,
      // 输出文件名规则
      fileName: (format) => {
        // 根据格式自定义输出文件名，例如：
        return `index.${format}.js`;
      }
    },
    rollupOptions: {
      output: {
        exports: 'named',
        // 为 UMD 格式提供外部化依赖的全局变量名
        globals
      },
      external: makeExternalPredicate([
        ...Object.keys(pkg.peerDependencies || {}),
        ...Object.keys(globals)
      ])
    },
  }
})
