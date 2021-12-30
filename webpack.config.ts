import path from "path";
import webpack from "webpack";
import "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
const AppCachePlugin = require('appcache-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackConfig: webpack.Configuration = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css"],
    alias: {
      src: path.resolve(__dirname, "src/")
    }
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].bundle.js"
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "initial",
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /public/
      },
      {
        test: /\.tsx$/,
        use: "ts-loader",
        exclude: /public/
      },
      {
        test: /\.html$/,
        use: "html-loader"
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { url: false }
          }
        ]
      },
      {
        test: /\.js$/,
        enforce: "pre",
        loader: "source-map-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    // new BundleAnalyzerPlugin(),
    new AppCachePlugin({
      // target files to cache.
      cache: ['vendor.bundle.js'],
      // target files to access with network everytime (no cache).
      network: ['main.bundle.js'],
      // if can't access the resource, rallback this file.
      fallback: [''],
      // prefer-online: use cache only offline
      // settings: ['prefer-online'],

      // Exclude file(s).
      // exclude: ["a.txt", /vendor\.bundle\.js$/],
      output: 'manifest.appcache'
    })
]
};

export default webpackConfig;
