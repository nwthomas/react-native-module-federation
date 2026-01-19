const { merge } = require("webpack-merge");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
    publicPath: "http://localhost:8084/",
  },
  devServer: {
    port: 8084,
    historyApiFallback: {
      index: "/index.html",
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "dashboard",
      filename: "remoteEntry.js",
      exposes: {
        "./DashboardApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

const mergedConfig = merge(commonConfig, devConfig);

module.exports = mergedConfig;
