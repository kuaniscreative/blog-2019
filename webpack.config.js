const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require("autoprefixer");
const CopyPlugin = require("copy-webpack-plugin");
const port = 3070;

// Custom Handlebars plugin for distributing HTML

const dirForChildPages = "pages";
function generateHtmlPlugins(templateDir) {
  // Read files in template directory
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir), {
    withFileTypes: true
  });
  // Select only files direct under the directory
  const files = templateFiles
    .filter(item => !item.isDirectory())
    .map(item => item.name);
  return files.map(item => {
    // Split names and extension
    const parts = item.split(".");
    const name = parts[0];
    const extension = parts[1];
    // Create new HTMLWebpackPlugin with options
    return new HtmlWebPackPlugin({
      filename: `./${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      templateParameters: {
        local: require(path.resolve(
          __dirname,
          `${templateDir}/json/${name}.json`
        )),
        global: {
          titleList: require('./src/pages/json/global/titleList.json')
        }
      }
    });
  });
}
const htmlPlugins = generateHtmlPlugins("./src/pages");

// webpack modules

module.exports = {
  devtool: "source-map",
  entry: {
    bundle: "./src/index.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: port
  },
  output: {
    filename: "main.bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    // this is for extracting css
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(handlebars|hbs)$/,
        loader: "handlebars-loader",
        options: {
          knownHelpersOnly: false,
          helperDirs: "./src/pages/helpers"
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './dist',
            },
          },
          // "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              autoprefixer: {
                browsers: ["last 2 versions"]
              },
              sourceMap: true,
              plugins: () => [autoprefixer]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "static/",
              useRelativePath: true
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: true
              },
              pngquant: {
                quality: "65-90",
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        handlebarsLoader: {}
      }
    }),
    new CopyPlugin([{ from: "src/pages/json", to: "pages/json" }]),
    new HtmlWebPackPlugin({
      template: "./src/index.hbs",
      templateParameters: {
        local: require("./src/pages/json/index.json"),
        global: {
          titleList: require('./src/pages/json/global/titleList.json')
        }
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
    })
  ].concat(htmlPlugins)
};
