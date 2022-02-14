'use strict';
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const webpack = require('webpack');
const { merge: webpackMerge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const utils = require('./vue.utils');
const MODE = 'development';
const config = require('./env');
const commonConfig = require('./webpack.common');
const jhiUtils = require('./utils.js');
const mockConfig = require('../src/main/webapp/mock/mock-config');

const MockWebpackPlugin = require('mock-webpack-plugin');
const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

module.exports = env =>
  webpackMerge(commonConfig({ env: MODE }), {
    mode: MODE,
    module: {
      rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true }),
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,
    entry: {
      main: './src/main/webapp/app/main',
    },
    output: {
      path: jhiUtils.root('target/classes/static/'),
      filename: 'app/[contenthash].bundle.js',
      chunkFilename: 'app/[id].chunk.js',
    },
    optimization: {
      moduleIds: 'named',
    },
    devServer: {
      contentBase: './target/classes/static/',
      port: 9060,
      proxy: [
        {
          context: [
            '/api',
            '/services',
            '/process-api',
            '/ureport',
            '/data',
            '/upload',
            '/avatar',
            '/jslib',
            '/img',
            '/management',
            '/swagger-resources',
            '/v2/api-docs',
            '/v3/api-docs',
            '/h2-console',
            '/auth',
          ],
          target: 'http://127.0.0.1:8081',
          secure: false,
          headers: { host: 'localhost:9000' },
        },
        {
          context: ['/mock/api'],
          target: 'http://127.0.0.1:5000',
          secure: false,
          headers: { host: 'localhost:9000' },
        },
      ],
      watchOptions: {
        ignored: /node_modules/,
      },
      historyApiFallback: true,
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': require('./mock.env'),
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        base: '/',
        template: './src/main/webapp/index.html',
        chunks: ['vendors', 'main', 'global'],
        chunksSortMode: 'manual',
        inject: true,
      }),
      new MockWebpackPlugin({
        config: mockConfig,
        port: 5000,
      }),
      new BrowserSyncPlugin(
        {
          host: 'localhost',
          port: 9000,
          proxy: {
            target: 'http://localhost:9060',
          },
          socket: {
            clients: {
              heartbeatTimeout: 60000,
            },
          },
          /*
        ,ghostMode: { // uncomment this part to disable BrowserSync ghostMode; https://github.com/jhipster/generator-jhipster/issues/11116
          clicks: false,
          location: false,
          forms: false,
          scroll: false
        } */
        },
        {
          reload: true,
        }
      ),
    ],
  });
