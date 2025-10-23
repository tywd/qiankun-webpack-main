import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { merge } from 'webpack-merge';
import baseConfig from './webpack.base.config.ts';

const devConfig: Configuration & { devServer?: DevServerConfiguration } = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: { // 添加 devServer 配置
    port: 8080,
    open: true,
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  } 
});

export default devConfig;