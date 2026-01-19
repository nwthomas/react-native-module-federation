const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commongConfig = require("./webpack.common.js");
const packageJson = require("./package.json");

const prodConfig = {
  mode: "production",
  node: {
    __dirname: true,
    __filename: true,
    global: true,
  },
  output: {
    publicPath: "/container/latest/",
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "mobile",
      filename: "remoteEntry.js",
      exposes: {
        "./MobileApp": "./bootstrap",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

const mergedConfig = merge(commongConfig, prodConfig);

module.exports = mergedConfig;
