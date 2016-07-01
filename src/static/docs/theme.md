## CSS

- 不要在组件内部直接写 CSS 代码
- 统一外部引用，方便自定义皮肤

### 文件

`themes/default/**.*`

### 说明

- use [postcss](http://postcss.org/), for the future
- use [scoped css](http://vue-loader.vuejs.org/en/features/scoped-css.html) carefully
  - do NOT use `@import` in scoped css
- *modifying `postcss-cssnext` to adjust compatibilities：*
  ``` js
  // .tools/webpack/index.js
  require('postcss-cssnext')({
    browsers: 'last 1 version'
  }),
```
