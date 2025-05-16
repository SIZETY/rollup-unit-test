const { banner, getCompiler, pkgName } = require("./rollup.js");

module.exports = {
  input: "src/index.js",
  output: {
    name: pkgName,
    file: "dist/bundle.esm.js",
    format: "es",
    banner,
  },
  plugins: [...getCompiler()],
};
