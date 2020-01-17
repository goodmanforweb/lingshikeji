const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


// const indexExtractCss = new ExtractTextPlugin('index.css')
// const redWalletExtractCss = new ExtractTextPlugin('about/[name].[contenthash].css')

const config = {
  entry: {
    index: path.resolve(__dirname, "src/main.js"),
    redwallet: path.resolve(__dirname, "src/components/redwallet/main.js"),

    vendors: ["vue", "vuex", "vue-router", "vue-i18n", "qrcode", "clipboard", 'bignumber.js','axios','element-ui','moment']
  },
  output: {
    path: path.resolve(__dirname, "build"),
    chunkFilename: "js/[name].bundle.js",
    filename: (chunkdata) => {
      // console.log(chunkdata);
      return "[name]/[name].bundle.js"
    }
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
        test: /(\.(png|jpg|jpeg|ttf|otf|woff|svg|eot|gif|bmp|mp4|pdf|mp3|ogg|wav)$)/,
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
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader", "sass-loader"]
        })
      },

    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".vue", ".css"],
    alias: {
      vue: "vue/dist/vue.js",
      util: path.resolve(__dirname, 'src/util/util.js'),
      hub: path.resolve(__dirname, 'src/components/Hub.js'),
      i18n: path.resolve(__dirname, 'src/i18n/index.js'),
      store: path.resolve(__dirname, 'src/components/vuex.js'),
      xrouter: path.resolve(__dirname, 'src/components/router.js'),
      apiconfig: path.resolve(__dirname, 'apiconfig.js'),
      createposter: path.resolve(__dirname, 'src/components/widget/poster/createImg.js'),

    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        sign:JSON.stringify("production"),
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
    new ExtractTextPlugin("[name].style.css"),

    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
      canPrint: true
    }),

    // // //生成模板
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      title:'Crypto JOY',
      inject: __dirname,
      BASE_URL: path.resolve(__dirname, "public/favicon.ico"),
      hash: true,
      chunks: ['vendors','index']
    }),
    new HtmlWebpackPlugin({
      template: "./public/rindex.html",
      filename: "rindex.html",
      title:'Crypto JOY',
      inject: __dirname,
      BASE_URL: path.resolve(__dirname, "public/favicon.ico"),
      hash: true,
      chunks: ['vendors','redwallet']
    }),
    // //添加代码标注
    new webpack.BannerPlugin("This file is created by bigman"),
    //提取合并共用js库
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendors",
      filename: "vendors/vendors.[hash:8].min.js"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, "public/gt.js"), to: path.resolve(__dirname, "build/") },

      { from: path.resolve(__dirname, "public/favicon.ico"), to: path.resolve(__dirname, "build/") },
      { from: path.resolve(__dirname, "public/game.ico"), to: path.resolve(__dirname, "build/") },
      { from: path.resolve(__dirname, "public/cjpool.ico"), to: path.resolve(__dirname, "build/") },
      { from: path.resolve(__dirname, "src/components/newkj/assets/card.mp3"), to: path.resolve(__dirname, "build/assets/") },
      { from: path.resolve(__dirname, "src/components/newkj/assets/horse.wav"), to: path.resolve(__dirname, "build/assets/") },
      { from: path.resolve(__dirname, "src/components/newkj/assets/coin.mp3"), to: path.resolve(__dirname, "build/assets/") },
      { from: path.resolve(__dirname, "src/components/newkj/assets/water.wav"), to: path.resolve(__dirname, "build/assets/") },


      { from: path.resolve(__dirname, "src/components/redwallet/assets/coinshake.mp3"), to: path.resolve(__dirname, "build/assets/") },
      { from: path.resolve(__dirname, "src/components/redwallet/assets/coinbg.mp3"), to: path.resolve(__dirname, "build/assets/") },

    ], {})
  ]
};
module.exports = config;
