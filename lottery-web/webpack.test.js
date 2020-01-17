const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = {
  entry: {
    index: path.resolve(__dirname, "src/main.js"),
    vendors: ["vue", "vuex", "vue-router", "vue-i18n", "qrcode", "clipboard"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    chunkFilename: "js/[name].bundle.js",
    filename: "js/[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        exclude: /node_modules/
      },
      {
        test: /(\.(png|jpg|jpeg|ttf|woff|svg|eot|gif|bmp|mp4|pdf)$)/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
              outputPath: "image/"
            }
          }
        ]
      },
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader", "sass-loader"]
        })
      },
      {
        test: /\.scss$/,
        // use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader", "sass-loader"]
        })
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".vue", ".css"],
    alias: {
      vue: "vue/dist/vue.js",
      util: path.resolve(__dirname, 'src/util/util.js'),
      hub: path.resolve(__dirname, 'src/components/Hub.js'),
      apiconfig: path.resolve(__dirname, 'apiconfig.js'),

    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        sign:JSON.stringify("development"),
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new UglifyJSPlugin({
      test: /\.js($|\?)/i,
      exclude: /\/node_modules/,
      uglifyOptions: {
        compress: {
          drop_debugger: true,
          drop_console: true
        }
      }
    }),
    new ExtractTextPlugin("styles.css"),
    // // //生成模板
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      title:'JOY LOTTO',
      inject: __dirname,
      BASE_URL: path.resolve(__dirname, "public/favicon.ico"),
      gt: path.resolve(__dirname, "public/gt.js"),
      hash: true
    }),
    // //添加代码标注
    new webpack.BannerPlugin("This file is created by bigman"),
    //提取合并共用js库
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendors",
      filename: "js/vendors.[hash:8].min.js"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, "public/favicon.ico"), to: path.resolve(__dirname, "build/") }
    ], {})
  ]
};
module.exports = config;
