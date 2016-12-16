# smui

## 项目搭建

1. 安装nodejs
2. 安装webpack
3. 安装vue-cli

*建议*

* 安装cnpm

### 项目创建

```sh

# vue1.x project
vue init sm-ui/webpack#v1 

# vue2.x project
# vue init sm-ui/webpack#v2

# fetch remote template
cd project

# install deps packages
cnpm install

# run dev demo
npm run dev

# release
npm run build

```

### v1 / v2 项目差异说明

1. v2 基于 vue2.0，在package.json中修改如下配置

```js
  "dependencies": {
    "babel-runtime": "^6.0.0",
    "smui-next": "^0.0.7",
    "vue": "^1.0.21"
  }
```

2. v2 依赖 smui-next，并且在webpack.base.conf中增加如下

```js

alias: {
    'vue': 'vue/dist/vue.js',
    'smui': 'smui-next',
}

```

3. v2与v1 注意相关特性的修改

* v-ref指令改为 ref属性
* for(key,value) 改为 for(value,key)
* 相关转换参考编译/自动转换工具 `npm/vue-transfer`


