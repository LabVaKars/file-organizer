/**
 * Base webpack config used across other specific configs
 */

import webpack from 'webpack';
import webpackPaths from './webpack.paths';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import path from 'path';
import { dependencies as externals } from '../../release/app/package.json';

export default {
  externals: [...Object.keys(externals || {})],

  stats: 'errors-only',

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },

  output: {
    path: webpackPaths.srcPath,
    // https://github.com/webpack/webpack/issues/1114
    library: {
      type: 'commonjs2',
    },
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    // alias: {
    //   tg_components: path.resolve(webpackPaths.srcRendererPath,'react/components'),
		// 	tg_common: path.resolve(webpackPaths.srcRendererPath,'react/components/common'),
		// 	tg_constants: path.resolve(webpackPaths.srcRendererPath,'react/constants'),
		// 	tg_containers: path.resolve(webpackPaths.srcRendererPath,'react/containers'),
		// 	tg_pages: path.resolve(webpackPaths.srcRendererPath,'react/pages'),
		// 	tg_reducers: path.resolve(webpackPaths.srcRendererPath,'react/reducers'),
		// 	tg_services: path.resolve(webpackPaths.srcRendererPath,'react/services'),
    // },
    modules: [webpackPaths.srcPath, 'node_modules'],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
};
