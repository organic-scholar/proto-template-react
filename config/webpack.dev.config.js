let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let argv = require('yargs').argv;



let paths = require('./paths');
let environment = require('./env')[argv.stage || 'dev'];
let main = path.join(paths.src, 'main');
let node = paths.nodeModules;

module.exports = {
  entry: {
    main: main,
  },
  output: {
    path: paths.web,
    filename: '[name]-bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
    alias: require('./modules'),
    modules: [paths.nodeModules, paths.webModules]
  },
  module: {
      loaders: [
          {
              test: /\.(ts|tsx)$/,
              include: [paths.src, paths.webModules],
              loader: 'awesome-typescript-loader',
              options: {}
          },
          {
              test: /\.css$/,
              loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
          },
          {
              test: /\.scss$/,
              loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader'
          },
          {
              test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
              exclude: /\/favicon.ico$/,
              loader: 'file-loader',
              query: {
                  name: 'static/media/[name].[hash:8].[ext]'
              }
          },
          {
              test: /\/favicon.ico$/,
              include: [paths.src],
              loader: 'file-loader',
              query: {
                  name: 'favicon.ico?[hash:8]'
              }
          },
          {
              test: /\.(mp4|webm)(\?.*)?$/,
              loader: 'url-loader',
              query: {
                  limit: 10000,
                  name: 'static/media/[name].[hash:8].[ext]'
              }
          },
          {
              test: /\.html$/,
              loader: 'html-loader',
              query: {
                  attrs: ['link:href'],
              }
          }
      ]
  },
    devServer: {
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        proxy: {
            "/api/**": {
                target: 'http://localhost:3000/',
                changeOrigin: true,
            }
        }
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require('../web/vendor-manifest.json')
        }),
        new webpack.EnvironmentPlugin(environment),
        new webpack.ProvidePlugin({
            jQuery: 'jquery'
        }),
        new webpack.IgnorePlugin(/^codemirror$/),
        new HtmlWebpackPlugin(),
        // new BundleAnalyzerPlugin()
    ]
};
