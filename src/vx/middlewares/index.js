import createLogger from 'vuex-fsa/logger'
import createPromise from 'vuex-promise'
import { setProgress, addToast } from '../utils'

import {
  PROMISE_PENDING,
  PROMISE_SUCCESS,
  PROMISE_FAILURE
} from '../constants'

const middlewares = [createPromise({
  debug: __DEV__,
  status: {
    PENDING: PROMISE_PENDING,
    SUCCESS: PROMISE_SUCCESS,
    FAILURE: PROMISE_FAILURE
  }
}), {
  // 实现进度掉、错误提示
  onMutation ({ meta, payload }, state, store) {
    switch (meta) {
      case PROMISE_PENDING:
        setProgress(60, store)
        break
      case PROMISE_SUCCESS:
        setProgress(100, store)
        break
      case PROMISE_FAILURE:
        setProgress(100, store)
        addToast(payload, store)
        break
      default:
        // setProgress(0)
    }
  }
}]

if (__DEV__) {
  middlewares.unshift(createLogger())
}

export default middlewares
