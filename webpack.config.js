const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const root = __dirname;

const isProd = process.argv.indexOf('-p') !== -1; //true or false


//Dynamic CSS config
/////////
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
////////////


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
      ###   TYPESCRIPT LOADER
      ***********/
      { 
        test: /\.tsx?$/,
        use: 'ts-loader'
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
    // hot: true,
    port: 9000,
    host: '0.0.0.0',
    stats: 'errors-only',
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
      filename: '[name].css',
      disable: !isProd,                  //run only on production
      allChunks: true
      //    filename: "[name].[contenthash].css"
      //     disable: process.env.NODE_ENV === "development"
    }),

    //JS UGLIFY on production - remove comments
    isProd && 
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false
        }
      }),

    //Load modules instead of import them
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

  ]
};
