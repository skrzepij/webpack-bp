var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require('path');
var root = __dirname;

module.exports = {
  context: root,
  entry: {
    app: "./src/js/entry.js",
    contact: "./src/js/contact.js"
  },
  output: {
    path: path.join(root, "dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          //resolve-url-loader may be chained before sass-loader if necessary
          fallback: "style-loader",       // put inline CSS into html file
          use: [{
            loader: 'css-loader',         // translates CSS into CommonJS
            options: {
              // minimize: true,          run with -p to minify;
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader'      // manipulate CSS (e.g. autoprefixer) postcss.config.js
          },
          {
            loader: 'sass-loader',        // compiles Sass to CSS
            options: {
              // data: "$env: " + process.env.NODE_ENV + ";"
            }
          }],
          publicPath: "/dist"
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.pug$/,
        use: [{
          loader: 'pug-loader',
          options: {
            
          }
        }]
      }
    ]
  },
  devServer: {
    contentBase: path.join(root, "dist"),
    compress: true,
    port: 9000,
    stats: "errors-only",
    //open: true            only in local env (with browser)
  },
  plugins: [
    ///HTML
    new HtmlWebpackPlugin({
      title: 'Webpack Sandbox v1',
      // minify: {
      //   collapseWhitespace: true
      // },
      hash: true,
      excludeChunks: ['contact'],
      template: './src/index.pug',
      favicon: './src/favicon.png'
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack Contact',
      hash: true,
      chunks: ['contact'],
      filename: 'contact.html',
      template: './src/contact.html',
      favicon: './src/favicon.png'
    }),


    //CSS
    new ExtractTextPlugin({
      filename: "[name].css",
      disable: false,
      allChunks: true
      //    filename: "[name].[contenthash].css"
      //     disable: process.env.NODE_ENV === "development"
    })
  ]
};
