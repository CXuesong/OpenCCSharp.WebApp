/* eslint-disable no-console */
import CopyPlugin from "copy-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import SveltePreprocess from "svelte-preprocess";
// eslint-disable-next-line import/no-extraneous-dependencies
import TerserPlugin from "terser-webpack-plugin";
import webpack from "webpack";
// For augmentation of webpack.Configuration
import { } from "webpack-dev-server";

function buildEnvironmentDefinitions(isProduction: boolean) {
  return {
    "environment.isProduction": isProduction,
  };
}

export default async function config(env: Record<string, unknown>, argv: Record<string, string>): Promise<webpack.Configuration> {
  const isProduction = argv.mode === "production";
  const outputPath = path.resolve(__dirname, "dist");
  console.info("isProduction:", isProduction);
  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/index.ts",
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      static: {
        directory: path.join(__dirname, "assets"),
        watch: true,
        staticOptions: {},
      },
      compress: true,
      port: 17080,
    },
    module: {
      rules: [
        {
          test: /\.svelte$/,
          use: {
            loader: "svelte-loader",
            options: {
              // TODO https://github.com/carbon-design-system/carbon-preprocess-svelte
              preprocess: SveltePreprocess(),
              compilerOptions: {
                dev: !isProduction,
              },
              emitCss: isProduction,
              hotReload: !isProduction,
            },
          },
        },
        {
          loader: "ts-loader",
          test: /\.ts$/,
          exclude: [
            /[/\\]node_modules[/\\]/,
            /[/\\]test[/\\]/,
          ],
          options: {
            experimentalWatchApi: true,
            transpileOnly: true,
          },
        },
        {
          // Allow importing plain css from node_modules
          // and css files extracted from svelte components
          test: /\.css$/i,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: "css-loader" },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // isRunAsDevServer ? "style-loader" : MiniCssExtractPlugin.loader,
            { loader: MiniCssExtractPlugin.loader },
            "@teamsupercell/typings-for-css-modules-loader",
            // Translates CSS into CommonJS
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: isProduction ? "[hash:base64]" : "[path][name]__[local]",
                  exportLocalsConvention: "camelCaseOnly",
                },
              },
            },
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        fs: false,
        child_process: false,
        src: path.resolve(__dirname, "src"),
        managed: path.resolve(__dirname, "managed"),
        // https://github.com/carbon-design-system/carbon-components-svelte/issues/896
        "carbon-components-svelte$": require.resolve("carbon-components-svelte/src/index"),
      },
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: path.join(__dirname, "assets"), to: outputPath },
        ],
      }),
      new webpack.DefinePlugin(buildEnvironmentDefinitions(isProduction)),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: path.join(__dirname, "./src/tsconfig.json"),
        },
        issue: {
          exclude: [
            (issue) => !!issue.file?.match(/[\\/]node_modules[\\/]/),
          ],
        },
      }),
      new MiniCssExtractPlugin({ filename: "index.css" }),
    ],
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            ecma: 2015,
            sourceMap: true, // Must be set to true if using source-maps in production
            parse: {
              ecma: 2018,
            },
          },
        }),
      ],
    },
    output: {
      path: outputPath,
      filename: "index.js",
    },
  };
}
