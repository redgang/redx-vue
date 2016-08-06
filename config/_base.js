/* eslint key-spacing:0 spaced-comment:0 */
import _debug from 'debug'
import path from 'path'
import { argv } from 'yargs'

let os = require('os'), hostName, localIP = '';
if (os) {
  let networkIO = os.networkInterfaces()['以太网'] || os.networkInterfaces().en0;
  if (networkIO) {
    for (let i = 0; i < networkIO.length; i++) {
      if (networkIO[i].family == 'IPv4') {
        localIP = networkIO[i].address;
        break;
      }
    }
  }
}

const debug = _debug('app:config:_base')
const config = {
  env: process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: path.resolve(__dirname, '..'),
  dir_client: 'src',
  dir_dist: 'dist',
  //dir_server: 'server',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host: localIP || 'localhost',
  server_port: process.env.PORT || 3200,
  server_mock: !!argv.mock,
  weinreFlag : !!argv.weinre,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_html_minify: false,
  compiler_css_modules: false,
  compiler_devtool: 'eval-source-map',
  compiler_hash_type: 'hash',
  compiler_fail_on_warning: false,
  compiler_quiet: false,
  compiler_public_path: '/',
  compiler_gzip: false,
  compiler_stats: {
    chunks: false,
    chunkModules: false,
    colors: true
  },
  compiler_vendor: [
    'vue',
    'vue-router',
    'vuex'
  ],
  // ----------------------------------
  // Test Configuration
  // ----------------------------------
  coverage_enabled: !argv.watch,
  coverage_reporters: [
    { type: 'text-summary' },
    { type: 'lcov', dir: 'coverage' }
  ]
}

/************************************************
-------------------------------------------------

All Internal Configuration Below
Edit at Your Own Risk

-------------------------------------------------
************************************************/

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env)
  },
  'NODE_ENV': config.env,
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
  '__DEBUG__': config.env === 'development' && !argv.no_debug,
  '__TEST__': config.env === 'test',
  '__WEINRE__': config.weinreFlag,
  '__LOCALHOST__': JSON.stringify(config.server_host),
  '__BASENAME__': JSON.stringify(process.env.BASENAME || '')
}

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
const pkg = require('../package.json')

config.compiler_vendor = config.compiler_vendor
  .filter((dep) => {
    if (pkg.dependencies[dep]) return true

    debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from vendor_dependencies in ~/config/index.js`
    )
  })

// ------------------------------------
// Utilities
// ------------------------------------
const resolve = path.resolve
const base = (...args) =>
  Reflect.apply(resolve, null, [config.path_base, ...args])

config.utils_paths = {
  base: base,
  client: base.bind(null, config.dir_client),
  dist: base.bind(null, config.dir_dist),
  server: base.bind(null, config.dir_server),
  test: base.bind(null, config.dir_test)
}

export default config
