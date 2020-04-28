const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        app: './src/index.ts'
    },
    devtool: 'inline-source-map', // source map per poter debuggare
    plugins: [
        new CleanWebpackPlugin(), // elimina i file precedentemente creati
        new HtmlWebpackPlugin({
            favicon: "./assets/img/favicon.png",
            template: "./index.html"
        }) // si occupa di importare i file js nell'html
    ],
    devServer: {
        contentBase: '/dist'
    },
    output: {
        filename: '[name].bundle.js', // [name] sintassi per usare variabili, in questo caso la chiave dell'oggetto "entry"
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [ // in questa sezione viene indicato il tipo di file che si vuole utilizzare e i relativi loader e configurazioni
            {
                test: /\.css$/, // regex
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.ts$/, // regex
                use: [
                    'ts-loader'
                ],
                exclude: /node_modules/, // escludo il nome moduls dalla compilazione
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            }
        ]
    }
};

