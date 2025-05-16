const { banner, getCompiler, pkgName } = require("./rollup.js");
const nodeResolve = require("@rollup/plugin-node-resolve").default;
const commonjs = require("@rollup/plugin-commonjs").default;
const terser = require("@rollup/plugin-terser").default;

module.exports = {
  input: "src/index.js",
  output: {
    name: pkgName,
    file: "dist/bundle.aio.js",
    format: "umd",
    banner,
    // plugins: [terser()],
  },
  plugins: [
    ...getCompiler(),
    commonjs({ include: /node_modules/ }),
    nodeResolve(),
  ],
};
