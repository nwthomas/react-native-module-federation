const { merge } = require("webpack-merge");
const path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");

const commonConfig = require("./webpack.common");

const devConfig = {
  mode: "development",
  node: {
    __dirname: true,
    __filename: true,
    global: true,
  },
  output: {
    path: path.resolve(__dirname, "../dist"), // Specify the output directory path
    filename: "main.js", // Specify the output bundle filename
    publicPath: "http://localhost:8083/",
  },
  devServer: {
    port: 8083,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./AuthApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

const mergedConfig = merge(commonConfig, devConfig);

module.exports = mergedConfig;
