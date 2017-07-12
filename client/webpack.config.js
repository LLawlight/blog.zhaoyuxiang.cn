const webpack           = require('webpack')
const path              = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = (env) => {
  return {
    entry: {
      main: './src/main.js'
    },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },

    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src')
      }
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          use: 'babel-loader',
          include: resolve('src')
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: path.posix.join('static', 'img/[name].[hash:7].[ext]')
          }
        }
      ]
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor', // 指定公共 bundle 的名字。
        minChunks: function (module) {
           // 该配置假定你引入的 vendor 存在于 node_modules 目录中
          return module.context && module.context.indexOf('node_modules') !== -1;
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest', //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
        chunks: ['vendor']
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true
      }),
      new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
      hot: true,
      historyApiFallback: true
    },
  }
}
