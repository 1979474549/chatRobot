const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAsstesWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'production',
    optimization: {
        minimizer: [new TerserWebpackPlugin(), new OptimizeCssAsstesWebpackPlugin()]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
                include: /src/
            },
            {
                test: /\.(gif|png|jpg)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1 * 1024,
                        encoding: false,
                        name: '[hash:5].[ext]'
                    }
                }]
            }
        ]
    }
}