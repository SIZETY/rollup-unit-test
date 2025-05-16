# rollup esmodule

---

esmodule 无法用 import 导入 .json 文件，rollup 中可以用 `@rollup/plugin-json` 插件解决

```js
import json from "@rollup/plugin-json";

const pkg = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8")
);

```

---

`package.json` 中的 type 属性可以用 `"module" | "commonjs"` 来区分是 `esmodule` 还是 `commonjs`

```json
{
  "type": "commonjs",
}
```

## 相关依赖

- @rollup/plugin-babel (bable 与 rollup 的集成插件)
- @babel/preset-env (babel 环境预设)
- @babel/plugin-transform-runtime （外部化对辅助函数和内置函数的引用，防止全局污染）
- @babel/core （Babel 编译器核心）
- @babel/runtime-corejs3 （模块化运行时helper core-js@3 polyfilling。还有 core-js@2）
- @rollup/plugin-json （将 .json 文件转换为 ES6 模块。）
- @rollup/plugin-node-resolve （resolve 第三方依赖）
- @rollup/plugin-commonjs （转换 CommonJS modules 为 ES2015）
- @rollup/plugin-terser（缩小生成的包）
