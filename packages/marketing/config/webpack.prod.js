const { merge } = require("webpack-merge");
const htmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common.js");
const moduleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");

const domain_url = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/container/latest/",
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new moduleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./marketingApp": "./src/bootstrap.js",
      },
      shared: packageJson.dependencies, //["react", "react-dom"],
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
