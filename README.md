<!--
 * @Author: your name
 * @Date: 2021-11-08 11:13:44
 * @LastEditTime: 2021-11-08 16:03:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electronicContract-H5g:\BaiduNetdiskDownload\资料\资料\demo\MYCLI\readme.md
-->
## 使用注意点
# 该脚手架使用vue3.X + webpack5 搭建，node 版本需16.0.0以上
# vue-loader npm 上最新版本为15.9.8，vue3.x需要16以上的版本，手动安装16.0.0版本的vue-loader
## package.json 部分命令释义
# new:view
执行 ./scripts/generateView/index文件，在views下创建目录，模板以对象形式添加，但是需要其他类型文件或者模板index文件还需要在添加新文件的生活才能代码（网上事例）
# new:batch
执行 cross-env DIRPATH=view node  ./scripts/generateView/batch
可传参，DIRPATH 的参数值就是要创建的src下的父目录地址，即DIRPATH 的参数值为views，所创建文件将会在src/views下，需要创建除了index，js，css之外的文件直接在模板文件batch数组加入数据即可，fun：文件内容返回函数，fileName：文件名（例index.css）