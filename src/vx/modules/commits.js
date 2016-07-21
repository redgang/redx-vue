import request from 'utils/request'
import { PROMISE_SUCCESS } from '../constants'

/**
 * actions、mutations中用的常量
 */
const GET_COMMITS = 'GET_COMMITS'

/**
 * vuex的state
 */
const state = {
  commits: null
}

/**
 * vuex的getters
 */
const getters = {
  commits: state => state.commits
}

/**
 * vuex中的actions
 */
const actions = {
  getCommits ({ commit }, payload) {
    commit(GET_COMMITS, request('{base}/commits?per_page=3&sha=', {
      rKey: {
        base: 'repos/redgang/base'
      },
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    }))
  }
}

/**
 * vuex中的mutations
 */
const mutations = {
  [GET_COMMITS] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      state.commits = payload
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}