// @ts-ignore
// const tools = require("../dist"); // yarn nyctest 时使用这个导入，且 .nycrc 中配置 instrument 需要改为默认值 true
const tools = require("../src/index"); // yarn nyctest-env | yarn pupptest 时使用这个导入
const expect = require("expect.js");
// const JSDOM = require("mocha-jsdom");

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

    it("边界测试用例", () => {
      expect(tools.clone(undefined)).to.equal(undefined);
      expect(tools.clone(null)).to.equal(null);
    });
  });
});

describe("获取当前 URL 中的参数", () => {
  describe("有 query 参数", function () {
    // JSDOM({ url: "https://***.com/?a=1&b=2" });

    it("参数id 的值", () => {
      expect(tools.getUrlParam("a")).to.be.equal("1");
    });
  });

  describe("无 query 参数", function () {
    // JSDOM({ url: "https://***.com/" });

    it("参数id 的值", () => {
      expect(tools.getUrlParam("a")).to.be.equal(undefined);
    });
  });
});

/**
 * 依赖包
 * mocha (测试框架)
 * expect.js （针对节点和浏览器的 BBD 断言）
 * nyc （代码覆盖率检测）
 * @babel/register
 * babel-plugin-istanbul
 * cross-env
 * mocha-jsdom
 */
