// We use an explicit public path when the assets are served by webpack
// to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
export default (config) => ({
  compiler_public_path: `http://${config.server_host}:${config.server_port}/`,
  proxy: {
    enabled: true,
    options: {
      // api请求接口服务器地址，例如：http://192.168.1.209:8088/
      host: 'https://api.github.com/',
      // 文件、图片服务器地址， 例如：http://192.168.1.131:8081/
      fileServiceUrl : '/',
      //文件、图片请求路径标识
      fileProxyFlag : 'file-service',
      match: /^\/api|file-service\/.*/,
      hook: (opt) => {
           //若上线环境不需要api/,则需要下面替换掉
           opt.url = opt.url.replace(/(api\/)/g, '');
           return opt
      }
    }
  }
})
