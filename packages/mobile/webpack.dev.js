const { merge } = require("webpack-merge");
const path = require("path");

const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonnConfig = require("./webpack.common");
const appDirectory = path.resolve(__dirname);
const packageJson = require("./package.json");

const devConfig = {
  mode: "development",
  entry: {
    app: path.join(__dirname, "src/index.web.js"),
  },
  node: {
    __dirname: true,
    __filename: true,
    global: true,
  },
  output: {
    path: path.resolve(appDirectory, "dist"),
    filename: "main.js",
    publicPath: "http://localhost:8085/",
  },
  devServer: {
    port: 8085,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // See: https://github.com/necolas/react-native-web/issues/349
      __DEV__: JSON.stringify(true),
    }),
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

const mergedConfig = merge(commonnConfig, devConfig);

module.exports = mergedConfig;
