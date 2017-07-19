var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require('path');
var root = __dirname;

var isProd = process.env.NODE_ENV === 'production'; //true or false

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
      /***************
      ###   SASS / CSS LOADERS
      ***********/
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

      /***************
      ###   JS LOADER
      ***********/
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },

      /***************
      ###   PUG LOADER
      ***********/
      {
        test: /\.pug$/,
        use: [{
          loader: 'pug-loader',
          options: {
            pretty: true
          }
        }]
      },

      /***************
      ###   FONTS AND IMAGES LOADER
      ***********/
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        loader: 'file-loader',
        options: {
          name: [name].[hash].[ext],
          publicPath: './',
          outputPath: 'img/'
        }
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: './',
          outputPath: 'fonts/'
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(root, "dist"),
    compress: true,
    // hot: true,
    port: 9000,
    host: '0.0.0.0',
    stats: "errors-only",
    disableHostCheck: true
    //open: true            only in local env (with browser)
  },
  plugins: [
    ///HTML
    new HtmlWebpackPlugin({
      title: 'Webpack Sandbox v1',
      hash: true,
      excludeChunks: ['contact'],
      template: './src/views/templates/index.pug',
      favicon: './src/favicon.png'
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack Page1',
      hash: true,
      excludeChunks: ['contact'],
      template: './src/views/templates/page1.pug',
      filename: 'page1.html',
      favicon: './src/favicon.png'
    }),
    // new HtmlWebpackPlugin({
    //   title: 'Webpack Contact',
    //   hash: true,
    //   chunks: ['contact'],
    //   filename: 'contact.html',
    //   template: './src/contact.html',
    //   favicon: './src/favicon.png'
    // }),


    //CSS
    new ExtractTextPlugin({
      filename: "[name].css",
      disable: false,
      allChunks: true
      //    filename: "[name].[contenthash].css"
      //     disable: process.env.NODE_ENV === "development"
    })

    //HOT MODULE REPLACEMENT
    //enable HMR globally
    // new webpack.HotModuleReplacementPlugin(),
    //print more readable module name in the browser console on HMR update
    // new webpack.NameModulesPlugin()
  ]
};
