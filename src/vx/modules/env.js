import createPersist from 'vuex-localstorage'

import {
  SET_ENV,
  SET_ENV_I18N,
  ENV_KEY,
  PROMISE_SUCCESS
} from '../constants'

const persist = createPersist(ENV_KEY, {
  lang: navigator.language.split('-')[0],
  i18n: {},
  authorized: false
})

const state = {
  env: persist.get()
}

const mutations = {
  [SET_ENV] (state, { payload }) {
    Object.assign(state.env, payload)
    persist.set(state.env)
  },

  [SET_ENV_I18N] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      Object.assign(state.env, {
        i18n: payload
      })
      persist.set(state.env)
    }
  }
}

export default {
  state,
  mutations
}
