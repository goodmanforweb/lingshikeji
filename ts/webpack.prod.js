const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = {
  mode:'production',
  entry: {
    index: path.resolve(__dirname, "src/main.js"),
    vendors: ["vue", "vuex", "vue-router", "vue-i18n",
    'axios',"qrcode", "clipboard", 'bignumber.js','echarts'],
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
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: { appendTsxSuffixTo: [/\.vue$/] }
          }
        ]
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
        use: [
          MiniCssExtractPlugin.loader, 
          "css-loader", 
          "postcss-loader", 
          "sass-loader"
        ]
      },

    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".vue", ".css", '.ts', '.tsx'],
    alias: {
      vue: "vue/dist/vue.js",
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
    new MiniCssExtractPlugin({
      filename: "[name].style.css"
    }),

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
      title:'Geeker',
      inject: __dirname,
      BASE_URL: path.resolve(__dirname, "public/favicon.ico"),
      hash: true,
      chunks: ['commons','vendors','index']
    }),
    // //添加代码标注
    new webpack.BannerPlugin("This file is created by bigman"),
   
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, "public/gt.js"), to: path.resolve(__dirname, "build/") },

      { from: path.resolve(__dirname, "public/favicon.ico"), to: path.resolve(__dirname, "build/") },
    ], {}),

  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
          vendors: {
              name: "vendors",
              chunks: "all",
              minChunks: 2
          },
          // vendors: {
          //   name: "vendors",
          //   chunks: "all",
          //   test: /[\\/]node_modules[\\/]/,
          // },
          // vendors2: {
          //   name: "vendors2",
          //   chunks: "all",
          //   test: /[\\/]node_modules[\\/]/,
          // },
        //   styles: {
        //     chunks: 'all',
        //     test: /\.(css)$/,
        //     name: 'vendor',
        //     minChunks: 1,
        //     enforce: true
        // }
          // commons: {
          //   test: /[\\/]node_modules[\\/]/,
          //   name: "vendors3",
          //   chunks: "initial",
          //   minChunks: 2
          // }
      }
  }
}

};
module.exports = config;
