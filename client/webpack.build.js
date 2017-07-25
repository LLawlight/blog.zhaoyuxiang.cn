var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.config.js')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

require('shelljs/global')
var assetsPath = path.join(path.resolve(__dirname, './dist'), 'static')
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', './favicon.ico', path.resolve(__dirname, './dist'))

var webpackConfig = merge(baseWebpackConfig('"production"'), {
  module: {
    loaders: utils.styleLoaders({ sourceMap: true, extract: true })
  },
  devtool: '#source-map',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: path.posix.join('static', 'js/[name].[hash].js'),
    chunkFilename: path.posix.join('static', 'js/[id].[chunkhash].js')
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
    // test: /\.xxx$/, // may apply this only for some modules
      options: {
        vue: {
          loaders: utils.cssLoaders({
            sourceMap: true,
            extract: true
          }),
          postcss: [
            require('autoprefixer')({
              browsers: ['last 20 versions']
            })
          ]
        }
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin(path.posix.join('static', 'css/[name].[contenthash].css')),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, './dist/index.html'),
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    })
  ]
})

// if (config.build.productionGzip) {
//   var CompressionWebpackPlugin = require('compression-webpack-plugin')
//
//   webpackConfig.plugins.push(
//     new CompressionWebpackPlugin({
//       asset: '[path].gz[query]',
//       algorithm: 'gzip',
//       test: new RegExp(
//         '\\.(' +
//         config.build.productionGzipExtensions.join('|') +
//         ')$'
//       ),
//       threshold: 10240,
//       minRatio: 0.8
//     })
//   )
// }

module.exports = webpackConfig
