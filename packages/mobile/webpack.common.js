const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const appDirectory = path.resolve(__dirname);

const { presets } = require(`${appDirectory}/babel.config.js`);

const compileNodeModules = [
  // Add every react-native package that needs compiling
  // 'react-native-gesture-handler',
].map(moduleName => path.resolve(appDirectory, `/node_modules/${moduleName}`));

const commonConfig = {
  module: {
    rules: [
      {
        test: /\.js$|tsx?$/,
        include: [
          path.resolve(__dirname, "index.web.js"), // Entry to your application
          path.resolve(__dirname, "App.web.tsx"), // Change this to your main App file
          ...compileNodeModules,
        ],
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets,
            plugins: ["react-native-web"],
          },
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
          },
        ],
      },
      {
        test: /\.(gif|jpe?g|png)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [
      ".web.tsx",
      ".web.ts",
      ".tsx",
      ".ts",
      ".web.jsx",
      ".web.js",
      ".jsx",
      ".js",
    ],
    alias: {
      "react-native$": "react-native-web",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public/index.html"),
    }),
  ],
};

module.exports = commonConfig;
