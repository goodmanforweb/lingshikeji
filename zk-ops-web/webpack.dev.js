const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const CopyWebpackPlugin = require('copy-webpack-plugin')


const interfaces = require('os').networkInterfaces(); // 在开发环境中获取局域网中的本机iP地址
let IPAddress = '';
for(var devName in interfaces){  
  var iface = interfaces[devName];  
  for(var i=0;i<iface.length;i++){  
        var alias = iface[i];  
        if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
          IPAddress = alias.address;  
        }  
  }  
} 


const config = {
  mode:'development',
  entry: {
    index: path.resolve(__dirname, "src/main.js"),
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
      // {
      //   test: /\.tsx?$/,
      //   exclude: /node_modules/,
      //   use: [
      //     "babel-loader",
      //     {
      //       loader: "ts-loader",
      //       options: { appendTsxSuffixTo: [/\.vue$/] }
      //     }
      //   ]
      // },
      {
        test: /(\.(png|jpg|jpeg|ttf|woff|otf|svg|eot|gif|bmp|mp4|pdf|mp3|ogg|wav)$)/,
        use: [
          {
            loader: "file-loader"
            // options: {
            //   name: "[path][name].[ext]",
            //   outputPath: "resource/"
            // }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
        // use: ExtractTextPlugin.extract({
        //   fallback: "style-loader",
        //   use: ['css-loader', 'postcss-loader', 'sass-loader']
        // })
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
        // use: ExtractTextPlugin.extract({
        //   fallback: "style-loader",
        //   use: ['css-loader', 'postcss-loader', 'sass-loader']
        // })
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".vue", ".css", '.ts', '.tsx'],
    alias: {
      vue: "vue/dist/vue.js",
    }
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   veryfyMan: [path.resolve('./src/mixins/index.js'), 'default'],
    // }),

    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        sign:JSON.stringify("development"),
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      title:'Crypto JOY',
      inject: __dirname,
      BASE_URL: path.resolve(__dirname, "public/favicon.ico"),
      hash: true,
      chunks: ['commons','vendors','index']
    }),
    new webpack.HotModuleReplacementPlugin(),
    
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, "public/gt.js"), to: path.resolve(__dirname, "build/") },

      { from: path.resolve(__dirname, "public/favicon.ico"), to: path.resolve(__dirname, "build/") },

    ], {})

  ],
  devtool: "eval-source-map",
  devServer: {
    contentBase: __dirname,
    historyApiFallback: true,
    hot: true,
    host: IPAddress,
    inline: true,
    disableHostCheck: true,
    proxy: {
      '/v1': {
        target:'https://opstest.cjoy.games',
        secure:true,
        changeOrigin: true
      }
    }
  }
};

module.exports = config;
