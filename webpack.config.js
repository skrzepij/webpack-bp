const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const root = __dirname;

const isProd = process.argv.indexOf('-p') !== -1; //true or false

/**
 * CSS config
 * Dynamic, dependent of build type
 */
const cssDev = ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',       // put inline CSS into html file
  use: [{
    loader: 'css-loader',         // translates CSS into CommonJS
    options: {
      importLoaders: 1,
      minimize: {  
        discardComments: { removeAll: true } // this comes from CSSNano
      }
    }
  },
  {
    loader: 'postcss-loader'      // manipulate CSS (e.g. autoprefixer) postcss.config.js
  },
  {
    loader: 'sass-loader'        // compiles Sass to CSS
  }],
  publicPath: '/dist'
});
const cssConfig = isProd ? cssProd : cssDev;

/**
 * Plugins list definition
 * 
 * It's possible to add plugin only for specific build type
 * (prod / dev)
 */
const pluginsList = [
  /**
   * HTML / PUG
   * Each separated page need to be defined here
   *
   * @param {Array} chunks - include necessary JS files
   * @param {Array} excludeChunks - remove unnecessary JS files
   * @param {string} template - use specific template source
   */
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


  //CSS - extract to separate file
  new ExtractTextPlugin({
    filename: '[name].css',
    disable: !isProd,                  //run only on production
    allChunks: true
    //    filename: "[name].[contenthash].css"
  }),

  //Define global modules instead of import them
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    _: 'lodash'
  }),

  //HOT MODULE REPLACEMENT
  //enable HMR globally
  new webpack.HotModuleReplacementPlugin({
    //options
  }),
  //print more readable module name in the browser console on HMR update
  new webpack.NamedModulesPlugin(),
];


/**
 * Add plugins 
 * only for production build
 */
if (isProd) {
  pluginsList.push(
    //JS UGLIFY on production - remove comments
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      }
    })
  );
}



/**
 * MAIN OBJECT
 */
module.exports = {
  context: root,
  entry: {
    app: './src/ts/entry.ts',         //If want to use ES6, change this path to ./src/js/entry.js
    contact: './src/js/contact.js'
  },
  resolve: {
    extensions: [' ', '.webpack.js', '.web.js', '.tsx', '.ts', '.js']
  },
  output: {
    path: path.join(root, 'dist'),
    filename: '[name].bundle.js',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
  },
  module: {
    rules: [
      /***************
      ***   SASS / CSS LOADERS
      ***********/
      {
        test: /\.scss$/,
        use: cssConfig
      },

      /***************
      ***   JS LOADER
      ***********/
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },

      /***************
      ***   TYPESCRIPT LOADER
      ***********/
      { 
        test: /\.tsx?$/,
        use: 'ts-loader'
      },

      /***************
      ***   PUG LOADER
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
      ***   IMAGES
      ***********/
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/,
        exclude: [/fonts/],             //dont test svg from fonts
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[hash:11].[ext]',
            publicPath: './',
            outputPath: 'img/'
          }
        }, {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 7,
            },
            pngquant: {
              quality: '65-90',
              speed: 4,
            }
          }
        }]
      },
      /***************
      ***   FONTS LOADER
      ***********/
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: [/img/],             //dont test svg from images
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
    contentBase: path.join(root, 'dist'),
    compress: true,
    // hot: true,         //HMR disabled because it's not working with JS right now. 
    port: 9000,
    host: '0.0.0.0',
    stats: 'errors-only',
    disableHostCheck: true
    //open: true            //only in local env (with browser)
  },
  plugins: pluginsList
};
