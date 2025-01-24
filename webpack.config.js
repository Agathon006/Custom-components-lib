import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'production',
  entry: './src/index.tsx',
  experiments: {
    outputModule: true
  },
  output: {
    libraryTarget: 'module',
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    umdNamedDefine: true,
    globalObject: 'this',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom'
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              esModule: false,
              modules: {
                localIdentName: '[sha1:hash:hex:4]'
              }
            }
          },
          "sass-loader",
        ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(ts|tsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};