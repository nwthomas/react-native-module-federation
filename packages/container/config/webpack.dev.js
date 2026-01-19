const { merge } = require("webpack-merge");
const path = require("path");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

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
    publicPath: "http://localhost:8080/",
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        auth: "auth@http://localhost:8083/remoteEntry.js",
        marketing: "marketing@http://localhost:8082/remoteEntry.js",
        dashboard: "dashboard@http://localhost:8084/remoteEntry.js",
        mobile: "mobile@http://localhost:8085/remoteEntry.js",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
  ],
};

const mergedConfig = merge(commonConfig, devConfig);

module.exports = mergedConfig;
