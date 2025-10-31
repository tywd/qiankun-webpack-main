# Qiankun 微前端解决方案
【搭建一个企业级微前端架构,各个仓库独立部署，拆分和聚合均可使用】
## 一、项目架构
### 1、初始架构说明（独立仓库）
```
# 主应用仓库（独立）
microfrontend-main/
├── src/
├── package.json
├── webpack.config.js
└── README.md

# 子应用仓库（每个独立）
microfrontend-virtual-list/     # 虚拟列表子应用
microfrontend-file-upload/      # 大文件上传子应用  
microfrontend-ai-agent/         # AI Agent子应用

# 配置共享包仓库（独立npm包）
microfrontend-configs/
├── packages/
│   ├── eslint-config/          # ESLint配置
│   ├── stylelint-config/       # Stylelint配置
│   ├── prettier-config/        # Prettier配置
│   ├── tsconfig/              # TypeScript配置
│   └── webpack-config/        # Webpack配置
└── README.md

# 脚手架工具仓库（独立）
microfrontend-cli/
├── templates/                  # 子应用模板
├── src/                       # CLI工具源码
├── package.json
└── README.md
```
### 2、配置共享方案：通过npm包共享
```
// 每个子应用的package.json中使用共享配置
{
  "name": "microfrontend-virtual-list",
  "devDependencies": {
    "@microfrontend-config/eslint": "^1.0.0",
    "@microfrontend-config/stylelint": "^1.0.0",
    "@microfrontend-config/prettier": "^1.0.0",
    "@microfrontend-config/tsconfig": "^1.0.0",
    "@microfrontend-config/webpack": "^1.0.0"
  }
}
```

## 微前端项目重新设计方案：独立仓库 + 脚手架工具
一、项目架构调整：独立仓库方案
1.1 新的项目结构（独立仓库）
# 主应用仓库（独立）
microfrontend-main/
├── src/
├── package.json
├── webpack.config.js
└── README.md

# 子应用仓库（每个独立）
microfrontend-virtual-list/     # 虚拟列表子应用
microfrontend-file-upload/      # 大文件上传子应用  
microfrontend-ai-agent/         # AI Agent子应用

# 配置共享包仓库（独立npm包）
microfrontend-configs/
├── packages/
│   ├── eslint-config/          # ESLint配置
│   ├── stylelint-config/       # Stylelint配置
│   ├── prettier-config/        # Prettier配置
│   ├── tsconfig/              # TypeScript配置
│   └── webpack-config/        # Webpack配置
└── README.md

# 脚手架工具仓库（独立）
microfrontend-cli/
├── templates/                  # 子应用模板
├── src/                       # CLI工具源码
├── package.json
└── README.md
1.2 配置共享方案：通过npm包共享
// 每个子应用的package.json中使用共享配置
{
  "name": "microfrontend-virtual-list",
  "devDependencies": {
    "@microfrontend-config/eslint": "^1.0.0",
    "@microfrontend-config/stylelint": "^1.0.0",
    "@microfrontend-config/prettier": "^1.0.0",
    "@microfrontend-config/tsconfig": "^1.0.0",
    "@microfrontend-config/webpack": "^1.0.0"
  }
}

## 二、脚手架工具详细设计

### 1 脚手架功能规划
```
// CLI工具核心功能
class ScaffoldFeatures {
  交互式配置 = [
    '子应用名称和描述',
    '技术栈选择（Vue3/React）',
    '端口号配置',
    '路由前缀设置',
    '功能模块选择'
  ];
  
  模板生成 = [
    '基础项目结构',
    'Qiankun生命周期配置',
    '开发环境配置',
    '构建配置',
    '代码规范配置'
  ];
  
  自动化设置 = [
    '依赖安装',
    'Git初始化',
    'Husky钩子配置',
    'CI/CD基础配置'
  ];
}
```

### 2 脚手架目录结构
```
microfrontend-cli/
├── bin/
│   └── microfrontend-cli.js    # CLI入口
├── src/
│   ├── commands/               # 命令处理
│   │   ├── init.ts            # 初始化命令
│   │   ├── create.ts          # 创建子应用
│   │   └── config.ts          # 配置命令
│   ├── templates/             # 模板引擎
│   │   ├── template-manager.ts
│   │   └── ejs-renderer.ts
│   ├── prompts/               # 交互提示
│   │   ├── app-info.ts
│   │   ├── tech-stack.ts
│   │   └── features.ts
│   └── utils/                 # 工具函数
│       ├── file-operations.ts
│       ├── package-manager.ts
│       └── git-utils.ts
├── templates/                 # 模板文件
│   ├── vue3-qiankun/          # Vue3模板
│   │   ├── package.json.ejs
│   │   ├── src/
│   │   ├── webpack.config.js.ejs
│   │   └── eslint.config.js.ejs
│   └── react-qiankun/         # React模板（可选）
│       ├── package.json.ejs
│       └── ...
├── package.json
└── README.md
```

### 3 CLI工具核心实现代码
package.json​​（CLI工具）
```
{
  "name": "microfrontend-cli",
  "version": "1.0.0",
  "description": "微前端子应用脚手架工具",
  "bin": {
    "microfrontend-cli": "./bin/microfrontend-cli.js"
  },
  "dependencies": {
    "commander": "^11.0.0",
    "inquirer": "^8.0.0",
    "ejs": "^3.1.9",
    "chalk": "^4.1.2",
    "ora": "^5.4.1",
    "fs-extra": "^11.1.1",
    "execa": "^5.1.1"
  },
  "keywords": ["microfrontend", "scaffold", "cli", "qiankun"],
  "author": "Your Name",
  "license": "MIT"
}
```
bin/microfrontend-cli.js​
```javascript
#!/usr/bin/env node

const { program } = require('commander');
const { createApp } = require('../src/commands/create');
const { initConfig } = require('../src/commands/init');

program
  .version('1.0.0')
  .description('微前端子应用脚手架工具');

program
  .command('create <app-name>')
  .description('创建新的微前端子应用')
  .option('-t, --template <template>', '选择模板 (vue3|react)')
  .option('-p, --port <port>', '开发服务器端口')
  .action(createApp);

program
  .command('init')
  .description('初始化项目配置')
  .action(initConfig);

program.parse(process.argv);
```
src/commands/create.ts​
```typescript
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { TemplateManager } from '../templates/template-manager';
import { FileOperations } from '../utils/file-operations';
import { PackageManager } from '../utils/package-manager';

export async function createApp(appName: string, options: any) {
  const spinner = ora('正在创建微前端子应用...').start();
  
  try {
    // 1. 收集用户输入
    const answers = await collectAppInfo(appName, options);
    
    // 2. 验证项目名称和路径
    await validateAppName(answers.appName);
    
    // 3. 选择并渲染模板
    const templateManager = new TemplateManager();
    await templateManager.renderTemplate(answers);
    
    // 4. 安装依赖
    spinner.text = '正在安装依赖...';
    await PackageManager.installDependencies(answers.appPath);
    
    // 5. 初始化Git仓库
    spinner.text = '正在初始化Git...';
    await FileOperations.initializeGit(answers.appPath);
    
    spinner.succeed(chalk.green(`子应用 ${appName} 创建成功！`));
    
    // 6. 显示后续步骤
    showNextSteps(answers);
    
  } catch (error) {
    spinner.fail(chalk.red(`创建失败: ${error.message}`));
    process.exit(1);
  }
}

async function collectAppInfo(appName: string, options: any) {
  const questions = [
    {
      type: 'input',
      name: 'appName',
      message: '子应用名称:',
      default: appName,
      validate: (input: string) => {
        if (!input.match(/^[a-z0-9-]+$/)) {
          return '名称只能包含小写字母、数字和连字符';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'description',
      message: '子应用描述:',
      default: '一个微前端子应用'
    },
    {
      type: 'list',
      name: 'template',
      message: '选择技术栈:',
      choices: [
        { name: 'Vue 3 + TypeScript + Qiankun', value: 'vue3-qiankun' },
        { name: 'React + TypeScript + Qiankun', value: 'react-qiankun' }
      ],
      default: 'vue3-qiankun'
    },
    {
      type: 'input',
      name: 'port',
      message: '开发服务器端口:',
      default: '8081',
      validate: (input: string) => {
        const port = parseInt(input);
        if (isNaN(port) || port < 1024 || port > 65535) {
          return '请输入有效的端口号 (1024-65535)';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'routePrefix',
      message: '路由前缀 (如: virtual-list):',
      validate: (input: string) => {
        if (!input.match(/^[a-z0-9-]+$/)) {
          return '路由前缀只能包含小写字母、数字和连字符';
        }
        return true;
      }
    },
    {
      type: 'checkbox',
      name: 'features',
      message: '选择功能特性:',
      choices: [
        { name: 'TypeScript', value: 'typescript', checked: true },
        { name: 'Vue Router', value: 'router', checked: true },
        { name: '状态管理 (Pinia)', value: 'state-management' },
        { name: '单元测试 (Vitest)', value: 'testing' },
        { name: 'E2E测试 (Playwright)', value: 'e2e-testing' }
      ]
    }
  ];
  
  return await inquirer.prompt(questions);
}
```

## 三、配置共享包详细设计
### 1 共享配置包结构
```
microfrontend-configs/
├── packages/
│   ├── eslint-config/
│   │   ├── index.js
│   │   ├── package.json
│   │   └── README.md
│   ├── stylelint-config/
│   │   ├── index.js
│   │   └── package.json
│   ├── prettier-config/
│   │   ├── index.js
│   │   └── package.json
│   ├── tsconfig/
│   │   ├── base.json
│   │   ├── vue.json
│   │   └── package.json
│   └── webpack-config/
│       ├── webpack.base.config.ts
│       ├── webpack.dev.config.ts
│       ├── webpack.prod.config.ts
│       └── package.json
├── package.json
└── README.md
```

### 2 共享配置示例
eslint-config/index.js​​
```javascript
module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off'
  }
};
```
webpack-config/webpack.base.config.ts
```typescript
import path from 'path';
import { fileURLToPath } from 'url';
import type { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

// 在 ES 模块中获取 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: Configuration = {
  entry: path.resolve(__dirname, './src/main.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash:8].js',
    publicPath: '/',
    clean: true,
    // 关键：输出UMD格式，供qiankun识别
    library: 'sub-app',
    libraryTarget: 'umd',
    globalObject: 'window'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[hash:8][ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      filename: 'index.html',
      title: 'Qiankun Sub App',
      inject: 'body'
    }),
    new ForkTsCheckerWebpackPlugin()
  ]
};

export default config;
```

## 主应用
```json
microfrontend-main/
├── public/
│   └── index.html
├── src/
│   ├── main.ts                 # 应用入口
│   ├── App.vue                 # 根组件
│   ├── layout/                 # 布局组件
│   │   ├── BasicLayout.vue     # 主布局
│   │   ├── Sidebar.vue         # 侧边栏
│   │   ├── Header.vue          # 顶部栏
│   │   └── TabsView.vue        # 标签页视图
│   ├── components/             # 通用组件
│   │   └── Breadcrumb.vue     # 面包屑
│   ├── router/                # 路由配置
│   │   └── index.ts
│   ├── stores/                # 状态管理
│   │   ├── index.ts
│   │   ├── tabs.ts           # 标签页状态
│   │   └── menu.ts           # 菜单状态
│   ├── types/                # 类型定义
│   │   └── index.ts
│   └── utils/                # 工具函数
│       └── index.ts
├── package.json
├── webpack.config.js
├── tsconfig.json
└── README.md
```