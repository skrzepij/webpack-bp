var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require('path');
var root = __dirname;

var isProd = process.argv.indexOf('-p') !== -1; //true or false

var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssProd = ExtractTextPlugin.extract({
  fallback: "style-loader",       // put inline CSS into html file
  use: [{
    loader: 'css-loader',         // translates CSS into CommonJS
    options: {
      importLoaders: 1
      // minimize: true,          // just run with -p to minify;
    }
  },
  {
    loader: 'postcss-loader'      // manipulate CSS (e.g. autoprefixer) postcss.config.js
  },
  {
    loader: 'sass-loader'        // compiles Sass to CSS
  }],
  publicPath: "/dist"
});
var cssConfig = isProd ? cssProd : cssDev;



module.exports = {
  context: root,
  entry: {
    app: "./src/js/entry.js",
    contact: "./src/js/contact.js"
  },
  output: {
    path: path.join(root, "dist"),
    filename: "[name].bundle.js",
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
  },
  module: {
    rules: [
      /***************
      ###   SASS / CSS LOADERS
      ***********/
      {
        test: /\.scss$/,
        use: cssConfig
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
      ###   IMAGES & FONTS LOADER
      ***********/
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/,
        loader: 'file-loader',
        exclude: [/fonts/],
        options: {
          name: '[name].[hash].[ext]',
          publicPath: './',
          outputPath: 'img/'
        }
      },
      // {
      //   test: /\.(svg)$/,
      //   loader: 'file-loader',
      //   exclude: [/images/],
      //   options: {
      //     name: '[path][name].[ext]',
      //     publicPath: './'
      //     // outputPath: 'fonts/'
      //   }
      // },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader',
        exclude: [/img/],
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


    //CSS - extract to separate file
    new ExtractTextPlugin({
      filename: "[name].css",
      disable: !isProd,                  //run only on production
      allChunks: true
      //    filename: "[name].[contenthash].css"
      //     disable: process.env.NODE_ENV === "development"
    }),

    //HOT MODULE REPLACEMENT
    //enable HMR globally
    new webpack.HotModuleReplacementPlugin({
      //options
    }),
    //print more readable module name in the browser console on HMR update
    new webpack.NamedModulesPlugin()
  ]
};
