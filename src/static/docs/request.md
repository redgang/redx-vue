## [request](https://github.com/github/fetch) 用法

> 默认GET请求，支持GET、POST、PUT、DELETE、PATCH等 

 -  用法一：
    ```
    request(options)
    ```
 -  用法二：GET请求
    ```
    request('url')
    ```
 -  用法三：options中排除url
    ```
    request('url', options)
    ```

> options配置

 ```options
   {
      url: 'url',          //url参数
      query: { ... },      //请求为GET时，url查询条件
      params: { ... },     //请求为POST、PUT、PATCH时，发送给服务器的参数值
      rKey: { ... }        //替换url中以{key}的参数
      headers: { ... }     //请求头部信息
    }
```  

> example

```vuex中调用actions
request('{base}/commits?per_page=3&sha=', {
    rkey: {
      base: 'repos/redgang/base'
    },
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  })
```

> request代理配置

```
const proxyUrl = __DEV__ ? '/api/' : ''
```