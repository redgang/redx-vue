import 'whatwg-fetch'
import Promise from 'nd-promise'
import qs from 'querystring'
import isPlainObj from 'is-plain-obj'

const defaultOptions = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'GET'
}

/**
 * request
 *
 *   request({
 *     url: 'path',
 *     query: { ... },
 *     params: { ... },
 *     body: { ... }
 *     headers: { ... }
 *   })
 *   request('path')
 *   request('path', { ... })
 *
 * @param  {String|Object} options   Options
 * @return {Promise}                 Promise
 */
export default function request (...args) {
  if (args.length === 0) {
    console.warn('URL or Options is Required!')
    return
  }

  if (typeof args[0] === 'string') {
    if (args[1] === undefined) {
      args[1] = {}
    } else if (!isPlainObj(args[1])) {
      console.warn('Options MUST be Object!')
      return
    }
    args[1].url = args[0]
    args[0] = args[1]
  }

  if (!isPlainObj(args[0])) {
    console.warn('Options MUST be Object!')
    return
  }
  return new Promise((resolve, reject) => {
    parseOptions(merge({}, defaultOptions, args[0]))
    .then(({ url, ...options }) => fetch(url, options))
    .then(res => {
      if (res && res.status >= 200 && res.status < 400) {
        getBody(res).then(resolve, reject)
      } else {
        getBody(res).then(reject)
      }
    })
    .catch(reject)
  })
}

function merge (src, ...args) {
  args.forEach(arg => {
    Object.keys(arg).forEach(key => {
      if (isPlainObj(arg[key])) {
        if (!src.hasOwnProperty(key)) {
          src[key] = {}
        }
        Object.assign(src[key], arg[key])
      } else {
        src[key] = arg[key]
      }
    })
  })
  return src
}

function getBody (res) {
  const type = res.headers.get('Content-Type')
  return (type && type.indexOf('json') !== -1) ? res.json() : res.text()
}

function parseOptions ({ url = '', query, params, body, mutate, ...options }) {
  if (body) {
    if (typeof body === 'object') {
      if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
        body = JSON.stringify(body)
      } else {
        url += ((url.indexOf('?') !== -1) ? '&' : '?') + qs.stringify(body)
        body = null
      }
    }
    if (body) {
      options.body = body
    }
  }

  if (query) {
    if (typeof query === 'object') {
      query = qs.stringify(query)
    }
    url += ((url.indexOf('?') !== -1) ? '&' : '?') + query
  }

  // 替换地址中的宏变量：{xyz}
  if (params) {
    url = replaceUrlWithParams(url, params)
  }

  options.url = url

  // mutate must be a function and return a promise
  // useful for add authorization
  if (mutate) {
    return mutate(options)
  }

  return Promise.resolve(options)
}

function replaceUrlWithParams (url, params) {
  // from: https://github.com/Matt-Esch/string-template
  return url.replace(/\{(\w+)\}/g, function (match, key, index) {
    let result

    // {{x}} -> {x}
    if (url.charAt(index - 1) === '{' &&
      url.charAt(index + match.length) === '}') {
      return key
    } else {
      // {x} -> *
      result = params.hasOwnProperty(key) ? params[key] : null
      if (result === null || result === undefined) {
        return ''
      }

      return result
    }
  })
}
