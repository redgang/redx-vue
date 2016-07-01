import {
  GET_COMMITS,
  PROMISE_SUCCESS
} from '../constants'

const state = {
  commits: null
}

const mutations = {
  [GET_COMMITS] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      state.commits = payload
    }
  }
}

export default {
  state,
  mutations
}
