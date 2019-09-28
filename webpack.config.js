const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    const production = env.NODE_ENV === 'production';

    return {
        entry: './src/index.js',
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist'),
        },
        mode: env.NODE_ENV,
        module: {
            rules: [
              {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              },
              {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            import: true
                        }
                    }
                ]
              }
            ]
        },
        devtool: production ? false : 'inline-source-map',
        devServer: {
            contentBase: './dist',
            port: 1337
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Find your nearest pitstop!',
                template: './src/index.html'
            }),
            new webpack.EnvironmentPlugin(['PITSTOP_SF_ACCESS_TOKEN'])
        ]
    }
};