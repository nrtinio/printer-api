// import path from "path";
// import { Configuration  as WebpackConfiguration } from "webpack";
// import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

// interface Configuration extends WebpackConfiguration {
//     devServer: WebpackDevServerConfiguration
// }

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports =  {
  entry: "./server.ts",
  target: "node",
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        use:  "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 4000,
  },
  optimization: {
    usedExports: true
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'node_modules/node-adodb/lib/adodb.js',
          to: ''
        }
      ]
    })
  ]
};