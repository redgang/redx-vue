/* global Vue */
import iScroll from './directive';

if (window.Vue) {
  window.iScroll = iScroll
  Vue.use(install)
}

function install(Vue) {
  Vue.directive('iscroll', iScroll)
}

iScroll.name = "iscroll"
iScroll.install = install

module.exports = iScroll