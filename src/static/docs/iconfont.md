## IconFont

使用字体渲染图标，采用连体字符，参见 [维基百科 - 合字](https://zh.wikipedia.org/wiki/合字)

### 文件

- `components/c-icon.vue`
- `mixins/iconfont.css`
- `components/icon.css`

*请根据兼容性需要选择字体文件（>=1）*

- `fonts/iconfont.ttf`
- `fonts/iconfont.woff`
- `fonts/iconfont.svg`
- `fonts/iconfont.eot`

### 用法

``` vue
<!-- 使用 value -->
<c-icon value="menu"></c-icon>
<!-- 或直接使用 slot -->
<c-icon>menu</c-icon>
```

### 编辑字体

0. 打开 [iconfont](http://www.iconfont.cn/)
0. 导入 SVG 字体文件
0. ...

### 存在问题
