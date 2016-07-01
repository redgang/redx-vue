import {
  SET_PROGRESS
} from '../constants'

const state = {
  progress: 0
}

const mutations = {
  [SET_PROGRESS] (state, { payload }) {
    state.progress = payload
  }
}

export default {
  state,
  mutations
}
