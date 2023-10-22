const path = require('path');
const { merge } = require('webpack-merge');
const HTMLPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    entry: './src/LibraryShowcase.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'tests'),
        publicPath: '/'
    },
    plugins: [
        new HTMLPlugin({
            filename: 'index.html',
            template: 'tests/index.html'
        })
    ],
    devServer: {
        open: true,
        client: {
            logging: 'log',
            overlay: true,
            progress: true
        },
        static: {
            directory: path.join(__dirname, 'tests'),
            serveIndex: true,
            watch: true
        },
        historyApiFallback: true
    }
});
