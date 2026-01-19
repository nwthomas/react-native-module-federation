const HtmlWebpackPlugin = require("html-webpack-plugin");

const commonConfig = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // transpiles modern JS to ES5
          options: {
            presets: [
              "@babel/preset-react", // transpiles JSX to JS
              "@babel/preset-env", // transpiles ES6+ to ES5
            ],
            plugins: [
              "@babel/plugin-transform-runtime", // allows async/await
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = commonConfig;
