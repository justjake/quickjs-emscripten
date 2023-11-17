const path = require('path');
const webpack = require('webpack')
const CopyPlugin = require("copy-webpack-plugin");
const { randomInt } = require('crypto');

module.exports = {
    //mode: 'none', // Disable minification
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist_pack'),
        filename: 'grafx-studio-quickjs.[name].js',
        chunkFilename: 'grafx-studio-quickjs.chunks.[name].js',
    }, 
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: { "path": false, "fs": false, "crypto": false }
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new CopyPlugin({
            patterns: [
                { from: "*.wasm", to: "", context: "../dist/generated" },                
            ],
        }), 
    ],
    module: {
        rules: [
            { test: /\.ts$/, loader: "ts-loader" },
            { test: /\.wasm$/, type: "asset/resource" }
        ]

    }
};