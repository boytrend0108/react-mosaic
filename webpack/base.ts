import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import { CONSTANTS } from './constants';

const config: webpack.Configuration = {
  entry: CONSTANTS.APP_ENTRY,
  output: {
    filename: '[name].js',
    path: CONSTANTS.DIST_DIR,
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.json', '.ts', '.js', '.tsx'],
    preferAbsolute: true,
    alias: {
      '@images': path.resolve(__dirname, '..', 'src/shared/assets/images'),
    },
    mainFiles: ['index']
  },
  optimization: {
    moduleIds: 'named',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                noEmit: false,
                declaration: false,
              },
            },
          },
        ],
      },

      {
        test: /node_modules.*\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              ident: 'postcss',
              plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
              ],
            },
          },
        }],
      },
      {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.less/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: CONSTANTS.HTML_TEMPLATE,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/images', to: 'images' }
      ],
    }),
  ],
};

// tslint:disable-next-line no-default-export
export default config;
