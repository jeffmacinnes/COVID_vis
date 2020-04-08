//const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');

const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
            test: /\.css$/,
            use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
          },
        ]
    },
    devServer: {
        contentBase: './dist',
        open: true
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     title: "Collaboration Visualization",
        // }),
        new Dotenv({
          path: './.env'
        })
    ],
};