# ju

> My hunky-dory Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## elementui自定义主题生成步骤
``` bash
按照elemenui的说明来
1:安装【分全局安装个本地安装】
  npm i element-theme-chalk -D
  和
  element-theme
2-1-1:【本地安装后第一步】生成scss全局变量文件
  node_modules/.bin/et -i
  或者
  node_modules/.bin/et -i 生成自定义变量的文件名
2-1-2:【本地安装后第二步】使用命令把elementui全局变量文件生成各个组件的css样式文件
  node_modules/.bin/et
2-2-1:【全局安装第一步】生成scss全局变量文件
  et -i
  或者
  et -i 生成自定义变量的文件名
2-2-2:【全局安装第二步】使用命令把elementui全局变量文件生成各个组件的css样式文件
  et
```

## 命名规则
``` bash
在api文件夹内api函数命名规则【驼峰命名法】：
  默认采用：      'api' + 具体操作
  获取列表时采用： 'api' + 具体操作/操作表 + 's'
  新增时采用：    'api' + 具体操作/操作表 + 'Add'
  编辑时采用：    'api' + 具体操作/操作表 + 'Edit'
  删除时采用：    'api' + 具体操作/操作表 + 'Delete'
在vue生命周期里，调用api的函数命名规则【驼峰命名法】：
  默认采用:       请求方式 + api函数名
```