const bable = require("@rollup/plugin-babel").default;
const pkg = require("../package.json");

const banner = `/**
* ${pkg.name} ${pkg.version}
* Licensed under MIT
*/`;

const getCompiler = () => {
  return [
    bable({
      babelrc: false,
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              browsers:
                "last 2 version, > 1%, ie >= 8, Chrome >= 45, safari >= 10",
              node: "0.12",
            },
            modules: false,
            loose: true,
          },
        ],
      ],
      plugins: [
        [
          "@babel/plugin-transform-runtime",
          {
            corejs: 3,
          },
        ],
      ],
      exclude: "node_modules/**",
      babelHelpers: "runtime",
    }),
  ];
};

const pkgName = "rollupTest";

module.exports = { banner, getCompiler, pkgName };
