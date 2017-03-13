var ExtractTextPlugin = require("extract-text-webpack-plugin");
var root = __dirname;

module.exports = {
    entry: "./entry.js",
    output: {
        path: 'build',
        filename: "bundle.js"
    },
    module: {
        rules: [{
          test: /\.scss$/,
          // use: [
          //   { loader: "style-loader" },
          //   { loader: "css-loader" }
          // ]
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            //resolve-url-loader may be chained before sass-loader if necessary
            use: ['css-loader', 'sass-loader']
          })
        }]
    },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
};


// const path = require('path');
// const webpack = require('webpack');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const extractSass = new ExtractTextPlugin({
//     filename: "[name].[contenthash].css",
//     disable: process.env.NODE_ENV === "development"
// });
//
// module.exports = {
//     module: {
//         rules: [{
//             test: /\.scss$/,
//             use: extractSass.extract({
//                 use: [{
//                     loader: "css-loader" // translates CSS into CommonJS
//                 }, {
//                     loader: "sass-loader" // compiles Sass to CSS
//                 }],
//                 // use style-loader in development
//                 fallback: "style-loader"
//             })
//         }]
//     },
//     plugins: [
//         extractSass
//     ]
// };
