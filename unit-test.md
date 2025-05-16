# 单元测试记录

## 简单测试

```js
// @ts-ignore
const tools = require("./dist");
const expect = require("expect.js");

describe("function clone", function () {
  describe("param data", function () {
    it("正确的测试用例", () => {
      // 基本数据类型
      expect(tools.clone("abc")).to.equal("abc");

      // 数组
      const arr = [1, 2, [3]];
      expect(arr).to.eql(tools.clone(arr));
      expect(arr).not.to.equal(tools.clone(arr));

      // 对象
      var obj = { a: { b: 1 } };
      expect(obj).to.eql(tools.clone(obj));
      expect(obj).not.to.equal(tools.clone(obj));
    });
  });

  it("边界测试用例", () => {
    expect(tools.clone(undefined)).to.equal(undefined);
    expect(tools.clone(null)).to.equal(null);
  });
});
```

---

## 代码覆盖率检测

Istanbul 是js 中十分常见的代码覆盖率检查工具，包名叫 `nyc`, 通过添加 `nyc` 包来进行代码覆盖率检测，安装完成后，可以在 `package.json` 中添加命令 `nyc nocha`

Istanbul 通过 4 个维度来衡量代码覆盖率：

- 语句覆盖率（Statemen Coverage）
- 分支覆盖率（Branch Coverage）
- 函数覆盖率 （Function  Coverage）
- 行覆盖率 （Line Coverage）

可以在根目录下添加 `.nycrc` 来配置检查输出的结果

---

禁止检测打包代码的插件：

```shell
yarn add @babel/register babel-plugin-istanbul cross-env -D
```

配置 `.nycrc`

```json
{
  "require": ["@babel/register"],
  "reporter": ["html", "text"],
  "sourceMap": false,
  "instrument": false
}
```

`babelrc` 配置

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": "last 2 versions, >1%, ie >= 8, Chrome >= 45, safari >= 10",
          "node": "0.12"
        },
        "modules": "commonjs",
        "loose": false
      }
    ]
  ],
  "env": {
    "test": {
      "plugins": ["istanbul"]
    }
  }
}
```

`package.json` 配置 在 `NODE_ENV=test` 时执行

```json
{
  "scripts": {
    "test": "cross-env NODE_ENV=test nyc mocha"
  }
}
```

`.nycrc`新增覆盖率配置，可以设置阈值大小来控制失败提示

```json
{
  "check-coverage": true,
  "lines": 100,
  "statements": 100,
  "functions": 100,
  "branches": 100
}
```

## 浏览器环境

浏览器环境需要用到 `jsdom`，对于 `mocha` 需要安装 `mocha-jsdom`

```js
JSDOM({ url: "https://***.com/?a=1&b=2" })
```

## 真实浏览器环境

mocha 可以直接在浏览器中运行，需要兼容一下 `require`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>mocha</title>
    <link rel="stylesheet" href="../../node_modules/mocha/mocha.css" />
  </head>
  <body>
    <div id="mocha"></div>
    <script src="../../node_modules/mocha/mocha.js"></script>
    <script src="../../node_modules/expect.js/index.js"></script>
    <script src="../../dist/bundle.aio.js"></script>

    <script>

      var libs = {
        "expect.js": expect,
        "../src/index": window.rollupTest,
      };

      var require = function (path) {
        return libs[path];
      };
    </script>

    <script>
      mocha.setup("bdd");
    </script>

    <script src="../index.js"></script>

    <script>
      mocha.run();
    </script>
  </body>
</html>
```

## 自动化测试 puppeteer

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>mocha</title>
    <link rel="stylesheet" href="../../node_modules/mocha/mocha.css" />
  </head>
  <body>
    <div id="mocha"></div>
    <script src="../../node_modules/mocha/mocha.js"></script>
    <script src="../../node_modules/expect.js/index.js"></script>
    <script src="../../dist/bundle.aio.js"></script>

    <script>
      var libs = {
        "expect.js": expect,
        "../src/index": window.rollupTest,
      };

      var require = function (path) {
        return libs[path];
      };
    </script>

    <script>
      mocha.setup("bdd");
    </script>

    <script src="../index.js"></script>

    <script>
      mocha.run();
    </script>
  </body>
</html>
```

```js
const puppeteer = require("puppeteer");

(async () => {
  const testPath = `file://${__dirname}/index.html?a=1`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(testPath);

  // 截屏并保存
  const pngPath = `${__dirname}/browser.png`;
  await page.screenshot({ path: pngPath, fullPage: true });

  await browser.close();
})();

```

## 总结

涉及依赖

- `cross-env` 运行跨平台设置和使用环境变量的脚本
- `expect.js` 针对节点和浏览器的 BDD 样式断言。
- `mocha` 测试框架
- `nyc` 测试代码覆盖率
- `puppeteer` 通过 DevTools 协议控制无头 Chrome 的高级 API，可用于自动化测试，爬虫
- `mocha-jsdom` 将 jsdom 简单集成到 mocha 中

---

- `yarn test` 单元测试
- `yarn nyctest` 单元测试及代码覆盖率
- `yarn nyctest-env` 测试未打包的代码覆盖率
- `yarn pupptest` 模拟真实浏览器环境测试
