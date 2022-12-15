const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const isProduction = process.env.NODE_ENV === "production";
const webpack = require("webpack");

const stylesHandler = "style-loader";

const config = {
  entry: "./src/script/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      chunks: ["main"],
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: "images/[hash]-[name].[ext]",
            },
          },
        ],
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};