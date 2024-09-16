import webpack from 'webpack';
import config from './base';

const bundleConfig: webpack.Configuration = {
  ...config,
  mode: 'production',
  optimization: {
    ...config.optimization,
    minimize: true,
  },
  plugins: [
    ...(config.plugins || []),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
};

// tslint:disable-next-line no-default-export
export default bundleConfig;
