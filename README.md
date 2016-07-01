# redx-vue
> 基于vue、vuex、vue-router实现的移动端框架模版

## Technologies

- Vue
- Vuex(vuex-fsa)
- Vue-Router
- PostCSS
- Webpack
- Koa
- ES6

## Quick Start

```bash
$ git clone git@https://github.com/redgang/redx-vue.git
$ cd redx-vue
$ npm install
$ npm start
# open http://localhost:3200
```
## Docs
```
# open http://localhost:3200/#!/docs
```

## Demo
```
# open http://localhost:3200/#!/demo
```

## Usage

|Command|Description|
|---|---|
|npm install|Install dependencies|
|npm run dev|Run webpack and restart server with hot-reload enabled|
|npm start|Run webpack and server with hot-reload enabled|
|npm run deploy|Build assets for development use, dumped in `./dist`|
|npm run deploy:prod|Build assets for production use, dumped in `./dist`|
|npm run deploy:start|Run static server to check `dist` files|


## Customize

- 使用 ES6 编写
- 数据使用vuex管理
- 使用 .vue 单文件组件，组件中不建议直接写css
- 组件commponents以c-开头，view公共组件以v-开头
- 逻辑尽量写在 script 里，保持 template 逻辑简单
- i18n, validator，request 可以正常使用，components中的组件还不稳定，随时会改
- 不限制使用何种 UI 组件，可以使用第三方，或自己开发（请尽量考虑复用性）
- 尽量使用小的依赖库
- 整体风格尽量向 [vue2.0](https://github.com/vuejs/vue/issues/2873) 靠拢，

## Directories
```
src
├── components                      #ui组件库
├── plugins                         #插件库
│   ├── i18n
│   └── validator
├── routes                          ＃路由
├── static                          ＃静态文件
│   ├── assets                      ＃其他资源文件
│   ├── docs
│   ├── i18n                        ＃国际化文件
│   └── images
├── themes                          ＃主题
│   └── default
│       ├── components              ＃ui组件库样式
│       ├── fonts                   
│       ├── images
│       ├── mixins                  ＃postcss特性
│       ├── variables               ＃postcss特性
│       └── views                   ＃业务组件样式
├── utils                           ＃公共库（request）
├── views                           ＃业务组件
│   ├── common                      ＃业务公共组件
│   ├── demo                        ＃示例
│   └── docs                        ＃文档
└── vx                              ＃vuex数据管理
    ├── actions
    ├── constants
    ├── getters
    ├── middlewares
    └── modules
```

## License

MIT &copy; [Redx](https://github.com/redgang)