import { GET_COMMITS } from '../constants'
import request from 'utils/request'

export default {
  getCommits ({ dispatch }, payload) {
    dispatch(GET_COMMITS, request({
      url: 'https://api.github.com/repos/redgang/base/commits?per_page=3&sha=',
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    }))
  }
}
