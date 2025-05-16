# rollup unit-test template

## 介绍

基于 rollup 的单元测试工具模板

## 使用

选择不同单元测试时，需要根据情况手动调整一下代码，以下是现有的 4 中测试方式：

- `yarn test` 单元测试
- `yarn nyctest` 单元测试及代码覆盖率
- `yarn nyctest-env` 测试未打包的代码覆盖率
- `yarn pupptest` 模拟真实浏览器环境测试

## 相关依赖

- `@rollup/plugin-babel` (bable 与 rollup 的集成插件)
- `@babel/preset-env` (babel 环境预设)
- `@babel/plugin-transform-runtime` （外部化对辅助函数和内置函数的引用，防止全局污染）
- `@babel/core` （Babel 编译器核心）
- `@babel/runtime-corejs3` （模块化运行时helper core-js@3 polyfilling。还有 core-js@2）
- `@rollup/plugin-json` （将 .json 文件转换为 ES6 模块。）
- `@rollup/plugin-node-resolve` （resolve 第三方依赖）
- `@rollup/plugin-commonjs` （转换 CommonJS modules 为 ES2015）
- `@rollup/plugin-terser`（缩小生成的包）
- `cross-env` 运行跨平台设置和使用环境变量的脚本
- `expect.js` 针对节点和浏览器的 BDD 样式断言。
- `mocha` 测试框架
- `nyc` 测试代码覆盖率
- `puppeteer` 通过 DevTools 协议控制无头 Chrome 的高级 API，可用于自动化测试，爬虫
- `mocha-jsdom` 将 jsdom 简单集成到 mocha 中

## 贡献
