const { merge } = require("webpack-merge");
const htmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common.js");
const moduleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require('../package.json');

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new moduleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
      shared: packageJson.dependencies // ["react", "react-dom"] // ,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
