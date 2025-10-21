import type { Configuration } from 'webpack';
import type WebpackDevServer from 'webpack-dev-server';
import { merge } from 'webpack-merge';
import baseConfig from './webpack.base.config.ts';

// 扩展 Configuration 类型以包含 devServer
interface WebpackConfigurationWithDevServer extends Configuration {
  devServer?: WebpackDevServer.Configuration;
}

const devServerConfig = {
  port: 8080,
  open: true,
  historyApiFallback: true,
  hot: true,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
};

const devConfig: WebpackConfigurationWithDevServer = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map'
} as WebpackConfigurationWithDevServer);

// 添加 devServer 配置
devConfig.devServer = devServerConfig;

export default devConfig;