import {
  ADD_TOAST,
  DELETE_TOAST
} from '../constants'


const state = {
  toasts: []
}

const getters = {
  toasts: state => state.toasts
}

const actions = {
  addToast ({ commit }, toast) {
    if (typeof toast === 'string') {
      toast = {
        name: 'Error',
        message: toast
      }
    }
    toast._id = Date.now()
    commit(ADD_TOAST, toast)
    setTimeout(() => {
      commit(DELETE_TOAST, toast)
    }, 3000)
  }
}

const mutations = {
  [ADD_TOAST] (state, payload) {
    state.toasts.push(payload)
  },

  [DELETE_TOAST] (state, payload) {
    state.toasts.$remove(payload)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
