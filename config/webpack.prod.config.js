let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let argv = require('yargs').argv;
let CleanWebpackPlugin = require('clean-webpack-plugin');




let paths = require('./paths');
let environment = require('./env')[argv.stage || 'dev'];
environment['NODE_ENV'] = 'production';

let main = path.join(paths.src, 'main');

module.exports = {
    entry: {
        main: main,
    },
    output: {
        path: paths.build,
        filename: '[name]-bundle.[chunkhash].js',
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
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!sass-loader"
                })
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
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.EnvironmentPlugin(environment),
        new ExtractTextPlugin("styles.[chunkhash].css"),
        // new BundleAnalyzerPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.ProvidePlugin({
            jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: __dirname + '/index.html'
        })
    ]
};

