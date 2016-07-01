import { argv } from 'yargs'

const threshold = 0

export default config => ({
  compiler_devtool: 'inline-source-map',
  coverage_enabled: !argv.watch,
  coverage_reporters: [
    { type: 'text-summary' },
    { type: 'lcov', dir: 'coverage' }
  ],
  coverage_check: {
    global: {
      statements: threshold,
      branches: threshold,
      functions: threshold,
      lines: threshold
    },
    each: {
      statements: threshold,
      branches: threshold,
      functions: threshold,
      lines: threshold
    }
  }
})
