# webpack5-ts-cli
基于webpack5+ts+vue3的脚手架

demo地址：https://z6w6j6.github.io/webpack5-ts-cli/#/index
## 使用注意点
### 该脚手架使用vue3.X + webpack5 搭建，node 版本需16.0.0以上
### vue-loader npm 上最新版本为15.9.8，vue3.x需要16以上的版本，手动安装16.0.0版本的vue-loader
### package.json 部分命令释义
### new:view
执行 ./scripts/generateView/index文件，在views下创建目录，模板以对象形式添加，但是需要其他类型文件或者模板index文件还需要在添加新文件的生活才能代码（网上事例）
### new:batch
执行 cross-env DIRPATH=view node  ./scripts/generateView/batch
可传参，DIRPATH 的参数值就是要创建的src下的父目录地址，即DIRPATH 的参数值为views，所创建文件将会在src/views下，需要创建除了index，js，css之外的文件直接在模板文件batch数组加入数据即可，fun：文件内容返回函数，fileName：文件名（例index.css）
### tips
#### 1.引入vue svg图标要点（每次都栽在同一个地方绝了）
1.svg-sprite-loader 记得下载，指定symbolId
2.webpack5 用 `type:asset/resource` 打包svg后缀文件
3.引入svg文件
4.svg-icon组件内部逻辑处理
5.全局注册
指路需要处理的文件及路径
build\webpack.common.js
src\assets\icons\index.ts
src\components\SvgIcon\index.vue
src\components\index.ts
src\index.ts
共5个
#### 2.命令创建并在指定路径下生成模板文件
代码路径：scripts\generateView
template.js：模板文件
batch.js：可指定文件名称及要生成的路径
index.js：生成在views下
