import createPersist from '../../utils/store'
import request from 'utils/request'
import { SET_ENV, SET_ENV_I18N, ENV_KEY, PROMISE_SUCCESS } from '../constants'

const localEnv = createPersist(ENV_KEY, {
  lang: navigator.language.split('-')[0],
  i18n: null,
  authorized: false
})

const state = localEnv.get()

const getters = {
  lang: state => state.lang,
  i18n: state => state.i18n,
  authorized: state => state.authorized
}

const mutations = {
  [SET_ENV] (state, payload) {
    Object.assign(state, payload)
    localEnv.set(state)
  },

  [SET_ENV_I18N] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      Object.assign(state, {
        i18n: payload
      })
      localEnv.set(state)
    }
  }
}

const actions = {
  setEnv ({ commit }, payload) {
    commit(SET_ENV, payload)

    if (payload.lang) {
      commit(SET_ENV_I18N, request(`./i18n/${payload.lang}.json`, {
        proxyFlag : false
      }))
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
