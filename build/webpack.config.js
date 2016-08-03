import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import config from '../config'
import _debug from 'debug'

const debug = _debug('app:webpack:config')
const paths = config.utils_paths
const {__DEV__, __PROD__, __TEST__} = config.globals

debug('Create configuration.')
const webpackConfig = {
  __DEV__,
  __PROD__,
  __TEST__,
  name: 'client',
  target: 'web',
  devtool: config.compiler_devtool,
  resolve: {
    root: paths.client(),
    extensions: ['', '.js', '.css', '.vue', '.json'],
    alias: {
      'components': paths.client('components'),
      'styles': paths.client('themes/default')
    },
    modulesDirectories: ['node_modules']
  },
  module: {}
}

webpackConfig.vue = {
    loaders: {
      js: 'babel!eslint'
    },
    postcss : pack => {
        return [
          require('postcss-import')({
            root: paths.client('themes/default'),
            path: paths.client('themes/default'),
            addDependencyTo: pack
          }),
          require('postcss-url')(),
          require('postcss-custom-properties')({
            variables: require(paths.client('themes/default/variables'))
          }),
          require('postcss-mixins')({
            mixinsDir: paths.client('themes/default/mixins')
          }),
          require('postcss-functions')({
            functions : {
              pxToRem : function($px) {
	              return $px*320/750/20 + 'rem';
              }
            }
          }),
          require('postcss-cssnext')({
            // see: https://github.com/ai/browserslist#queries
            browsers: 'Android >= 4, iOS >= 7'
          }),
          require('postcss-browser-reporter')(),
          require('postcss-reporter')()
        ]
    },
    autoprefixer: false
}


// ------------------------------------
// style loader
// ------------------------------------

function generateLoaders(loaders) {
  var sourceLoader = loaders.map(function (loader) {
    var extraParamChar
    if (/\?/.test(loader)) {
      loader = loader.replace(/\?/, '-loader?')
      extraParamChar = '&'
    } else {
      loader = loader + '-loader'
      extraParamChar = '?'
    }
    return loader + (__PROD__ ? extraParamChar + 'sourceMap' : '')
  }).join('!')

  if (__PROD__) {
    return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
  } else {
    return ['vue-style-loader', sourceLoader].join('!')
  }
}

// http://vuejs.github.io/vue-loader/configurations/extract-css.html
webpackConfig.vue.loaders = {
  css: generateLoaders(['css']),
  postcss: generateLoaders(['css']),
  less: generateLoaders(['css', 'less']),
  sass: generateLoaders(['css', 'sass?indentedSyntax']),
  scss: generateLoaders(['css', 'sass']),
  stylus: generateLoaders(['css', 'stylus']),
  styl: generateLoaders(['css', 'stylus'])
}

var styleLoaders = function () {
  var output = []
  var loaders = webpackConfig.vue.loaders;
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
}

// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY_PATH = ["babel-polyfill", paths.client('index.js')]

webpackConfig.entry = {
  app: __DEV__
    ? APP_ENTRY_PATH.concat(`webpack-hot-middleware/client?path=${config.compiler_public_path}__webpack_hmr`)
    : APP_ENTRY_PATH,
  vendor: config.compiler_vendor
}

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  path: paths.dist(),
  publicPath: config.compiler_public_path,
  filename: `[name].[${config.compiler_hash_type}].js`,
  chunkFilename: `[id].[${config.compiler_hash_type}].js`
}

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals),
  new HtmlWebpackPlugin({
    template: paths.client('index.html'),
    hash: false,
    favicon: paths.client('static/favicon.ico'),
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: config.compiler_html_minify,
      minifyJS: config.compiler_html_minify
    }
  }),
  new CopyWebpackPlugin([{
    from: paths.client('static')
  }], {
    //ignore: ['*.ico', '*.md']
  })
]

// ------------------------------------
// Pre-Loaders
// ------------------------------------
/*
[ NOTE ]
We no longer use eslint-loader due to it severely impacting build
times for larger projects. `npm run lint` still exists to aid in
deploy processes (such as with CI), and it's recommended that you
use a linting plugin for your IDE in place of this loader.

If you do wish to continue using the loader, you can uncomment
the code below and run `npm i --save-dev eslint-loader`. This code
will be removed in a future release.
*/

webpackConfig.module.preLoaders = [{
  test: /\.(js|vue)$/,
  loader: 'eslint',
  exclude: /node_modules/,
  query: {
    emitWarning: __DEV__
  }
}]

webpackConfig.eslint = {
  formatter: require('eslint-friendly-formatter')
}

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.loaders = [
  {
    test: /\.vue$/,
    loader: 'vue'
  },{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel'
  },
  {
    test: /\.html$/,
    loader: 'vue-html'
  },
  {
    test: /\.json$/,
    loader: 'json'
  },
  {
    test: /\.(png|jpg|gif|svg|woff2?|eot|otf|ttf)(\?.*)?$/,
    loader: 'url',
    query: {
      limit: 10000,
      name: '[name].[ext]?[hash:7]'
    }
  },...styleLoaders()]


// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809

if (__DEV__) {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else if (__PROD__) {
  debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    }),
    new ProgressBarPlugin(),
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks: true
    })
  )

  // Gzip off by default as many popular static hosts such as
  // Surge or Netlify already gzip all static assets for you.
  if (config.compiler_gzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin')
    debug('gzip all dist assets for you');
    webpackConfig.plugins.push(
      new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /.(js|css|html|ico)$/,
        threshold: 0,
        minRatio: 0.8
      })
    )
  }
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor']
  }))
}

export default webpackConfig
