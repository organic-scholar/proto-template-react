let path = require("path");
let webpack = require("webpack");
let ExtractTextPlugin = require('extract-text-webpack-plugin');


let paths = require('./paths');
let vendor = path.join(paths.src, 'vendor');
let node  = paths.nodeModules;

module.exports = {
    entry: {
        vendor: [vendor]
    },
    resolve: {
        alias: {
            // 'react': node+'/react/dist/react.js',
            // 'react-dom': node+'/react-dom/dist/react-dom.js',
            // 'react-router': node+'/react-router/umd/react-router.min.js',
            // 'react-router-dom': node+'/react-router-dom/umd/react-router-dom.min.js',
            'axios': node+'/axios/dist/axios.min.js',
        },
        modules: [paths.nodeModules, paths.webModules]
    },
    module: {
        loaders: [
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
            },
        ]
    },
    output: {
        path: paths.web,
        filename: "[name].js",
        library: "[name]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(paths.web, "[name]-manifest.json"),
            name: "[name]",
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery'
        }),
        new ExtractTextPlugin("styles.css"),
    ]
};
