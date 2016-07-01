import {
  ADD_TOAST,
  DELETE_TOAST
} from '../constants'

const state = {
  toasts: []
}

const mutations = {
  [ADD_TOAST] (state, { payload, meta }) {
    payload._id = Date.now()
    state.toasts.push(payload)
  },

  [DELETE_TOAST] (state, { payload }) {
    state.toasts.$remove(payload)
  }
}

export default {
  state,
  mutations
}
