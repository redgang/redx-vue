import store from 'vx/store'
import { SET_PROGRESS, ADD_TOAST, DELETE_TOAST } from 'vx/constants'

export function setProgress (progress) {
  store.dispatch(SET_PROGRESS, progress)
  if (progress === 100) {
    setTimeout(() => {
      store.dispatch(SET_PROGRESS, 0)
    }, 500)
  }
}

export function addToast (toast) {
  if (toast) {
    if (toast.then) {
      toast.then(_addToast).catch(_addToast)
    } else {
      _addToast(toast)
    }
  }
}

function _addToast (toast) {
  if (typeof toast === 'string') {
    toast = {
      name: 'Error',
      message: toast
    }
  }
  toast._id = Date.now()
  store.dispatch(ADD_TOAST, toast)
  setTimeout(() => {
    store.dispatch(DELETE_TOAST, toast)
  }, 3000)
}
