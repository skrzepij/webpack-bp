var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require('path');
var root = __dirname;

module.exports = {
  context: root,
  entry: {
    app: "./src/js/entry.js"
  },
  output: {
      path: path.join(root, 'dist'),
      filename: "[name].bundle.js"
  },
  module: {
      rules: [{
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              minimize: true,
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader' // postcss.config.js
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
            options: {
              // data: "$env: " + process.env.NODE_ENV + ";"
            }
          }],
          //resolve-url-loader may be chained before sass-loader if necessary
          fallback: "style-loader",
        })
      }

    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "styles.css"
      //    filename: "[name].[contenthash].css"
      //     disable: process.env.NODE_ENV === "development"
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack Sandbox v1',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      template: './src/index.ejs',
      favicon: './src/favicon.png'
    })
  ]
};





/////////////////////////CSS
//   {
//   test: /\.css$/,
//   exclude: /node_modules/,
//   use: [
//       {
//           loader: 'style-loader',
//       },
//       {
//           loader: 'css-loader',
//           options: {
//               importLoaders: 1,
//           }
//       },
//       {
//           loader: 'postcss-loader'
//       }
//   ]
// }
