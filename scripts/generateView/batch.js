
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const DIRPATH = process.env.DIRPATH;
const resolve = (...file)=>path.resolve(__dirname,...file)
const log = msg=>console.log(chalk.green(msg))
const errorLog = msg=>console.log(chalk.red(msg))
const successLog = msg=>console.log(chalk.blue(msg))
// 模板文件
const {batch} = require('./template')

// console.log(JSON.parse(process.env.npm_config_argv).cooked)
log(`请输入要生成的页面组件名称、会生成在 ${DIRPATH}/目录下`)
let componentName = ''
process.stdin.on('data',async (data) => {
  // 组件名称
  const inputName = String(data).trim().toString()
  // vue页面组件路径
  const componentPath = resolve(`../../src/${DIRPATH}`,inputName)
  // 判断该目录下文件夹是否存在
  const hasComExists = fs.existsSync(componentPath)
  if(hasComExists){
    errorLog(`${inputName}页面组件已存在，请重新输入`)
    return
  }else{
    log(`正在生成 component 目录 ${componentPath}`)
    await createFloder(componentPath)
    // 生成文件
    // 获取组件名
    if (inputName.includes('/')) {
      const inputArr = inputName.split('/')
      componentName = inputArr[inputArr.length - 1]
  } else {
      componentName = inputName
  }
    await batchCreate(componentName,componentPath)
    
  }
    process.stdin.emit('end')
})
process.stdin.on('end', () => {
  log('exit')
  process.exit()
})
 const batchCreate = async (componentName,componentPath)=>{
  try {
    const templates = batch
    for(let i=0;i<templates.length;i++){
      let item = templates[i]
      if(!item.fileName){
        errorLog('请补充模板文件的名称字段fileName，如index.vue，无fileName字段的文件将不生成')
        continue
      }
      let file = resolve(componentPath, item.fileName)
      log(`正在生成${item.fileName},${file}`)
      await createFile(file, item.fun(componentName))
    }
    successLog('生成成功')
  } catch (e) {
    errorLog(e.message)
  }
}
function createFloder(directory){
  return new Promise((resolve)=>{
    mkdirs(directory,function(){
      resolve(true)
    })
  })
}
// 递归创建文件夹
function mkdirs(directory,callback){
  const exist = fs.existsSync(directory)
  if(exist){
    callback()
  }else{
    mkdirs(path.dirname(directory),function(){
      fs.mkdirSync(directory)
      callback()
    })
  }
}
// 生成文件的函数
const createFile = (path,data)=>{
  // 判断文件是否存在
    if(fs.existsSync(path)){
      errorLog(`${path}文件已存在`)
      return
    }
    return new Promise((resolve,reject)=>{
      fs.writeFile(path,data,'utf-8',err=>{
        if(err){
          errorLog(err.message)
          reject(err)
        }else{
          resolve(true)
        }
      })
    })
  }
