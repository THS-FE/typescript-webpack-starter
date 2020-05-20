
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const config = {
  entry: './src/index.ts', // 入口文件
  externals: {
    cesium: 'Cesium',
  },
  module: {
    rules: [
      // 使用 babel-loader 解析 ts, js, tsx, jsx 文件.
      {
        test: /\.(ts|js)x?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      // 执行顺序：从右到左
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 提取到单独的CSS文件
          MiniCssExtractPlugin.loader,
          // 转换 CSS 到 CommonJS
          'css-loader',
          // 给 CSS 添加前缀以适应各浏览器
          'postcss-loader',
          // 编译 Sass 到 CSS
          'sass-loader',
        ],
      },
      // 使用 url-loader 将小于 4KB 图片 转换为 base64 URIs
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name].[hash:8].[ext]',
              limit: 4096,
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'], // 按顺序解析以上扩展名的文件(必须添加，否则通过import进来的文件无法解析。import时可不写扩展名 默认值为 ['.wasm', '.mjs', '.js', '.json']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: 'public/index.html', title: 'TypeScript-Webpack-starter' }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map'; // 导出SourceMap供调试
  }

  if (argv.mode === 'production') {

  }
  return config;
};
