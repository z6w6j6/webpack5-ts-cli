<template>
  <div v-if="stream || blob" v-loading="loading">
    <!-- <pdf v-for="item in numPages" ref="pdf" :key="item" :page="item" :src="src" /> -->
    <!-- <pdf :src="src" /> -->

    <div v-if="fullScreen && show" class="pdf-viewer__wrapper">
      <div class="pdf-viewer__mask" />
      <svg-icon icon-class="close1" class="close" @click="close" />
      <div ref="pdf-detail" class="file-detial fullScreen" :loading="loading" />
      <div v-if="total>1" class="pdf-viewer__btn pdf-viewer__actions top-action">
        <div class="pdf-viewer__actions__inner">
          <el-pagination
            :hide-on-single-page="true && showSinglePage"
            :total="total"
            :page-size="1"
            :current-page="currentPage"
            layout="prev, pager, next"
            @current-change="currentChange"
          />
        </div>
      </div>
      <div class="pdf-viewer__btn pdf-viewer__actions bottom-action">
        <div class="pdf-viewer__actions__inner">
          <svg-icon icon-class="reduce" class="action-icon reduce" @click="reduce" />
          <svg-icon icon-class="fangda" class="action-icon enlarge" @click="enLarge" />
          <svg-icon icon-class="rotate1" class="action-icon rotate-left" @click="rotate(false)" />
          <svg-icon icon-class="rotate1" class="action-icon rotate-right" @click="rotate(true)" />
        </div>
      </div>
    </div>
    <div v-if="!fullScreen">
      <div ref="pdf-detail" class="file-detial " :loading="loading" />
      <div v-if="!showAll" class="paginWrapper">
        <el-pagination
          :hide-on-single-page="true && showSinglePage"
          :total="total"
          :page-size="1"
          :current-page="currentPage"
          layout="prev, pager, next"
          @current-change="currentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
const PDFJS = require('pdfjs-dist')
PDFJS.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js'

export default {
  name: 'ShowPdf',
  props: {
    stream: {
      type: Blob,
      default: null
    },
    showSinglePage: {
      type: Boolean,
      default: true
    },
    fullScreen: {
      type: Boolean,
      default: false
    },
    scale: {
      type: Number,
      default: 1
    },
    showAll: {
      type: Boolean,
      default: false
    },
    blob: { // 提供本地文件的预览
      type: ArrayBuffer,
      default: null
    }
  },
  data() {
    return {
      src: '',
      currentPage: 1,
      total: 0,
      show: true,
      myscale: 1,
      loading: true
    }
  },
  watch: {
    async stream() {
      this.loading = true
      await this.baseToUrl()
      this.loading = false
    },
    async blob() {
      if (!this.blob) {
        return false
      }
      this.$nextTick(async() => {
        this.pdf = await PDFJS.getDocument(this.blob)
        this.total = this.pdf.numPages
        if (this.showAll) {
          for (let i = 1; i <= this.total; i++) {
            await this.showFdf(i, true)
          }
        } else {
          this.showFdf()
        }
      })
    }
  },
  async created() {
    this.myscale = this.scale
    this.loading = true
    await this.baseToUrl()
    this.loading = false
  },
  methods: {
    close() {
      this.show = !this.show
      this.$emit('pdfClose')
    },
    enLarge() {
      this.myscale += 0.1
      this.showFdf()
    },
    reduce() {
      this.myscale -= 0.1
      this.showFdf()
    },
    rotate(type) {
      const dom = this.$refs['pdf-detail'].getElementsByTagName('canvas')[0]
      const current = dom.style.transform
      const deg = current && +dom.style.transform.substring(7, dom.style.transform.length - 4)
      const currentDeg = type ? deg + 90 : deg - 90
      dom.style.transform = current ? `rotate(${currentDeg}deg)` : 'rotate(90deg)'
    },
    currentChange(val) {
      this.currentPage = val
      this.showFdf()
    },
    baseToUrl() {
      if (this.stream || this.url) {
        this.src = this.getObjectURL(this.stream)
        var reader = new FileReader()
        const that = this
        reader.onload = async function() {
          if (!this.result) {
            return false
          }
          const raw = window.atob(this.result.split('base64,')[1])

          const rawLength = raw.length
          const rawArray = new Uint8Array(new ArrayBuffer(rawLength))
          for (let i = 0; i < rawLength; i++) {
            rawArray[i] = raw.charCodeAt(i)
          }
          that.pdf = await PDFJS.getDocument(rawArray)
          that.total = that.pdf.numPages
          if (that.showAll) {
            for (let i = 1; i <= that.total; i++) {
              await that.showFdf(i, true)
            }
          } else {
            that.showFdf()
          }
        }
        reader.readAsDataURL(this.stream)
      }
    },

    async showFdf(currentpage, createNewWrap) {
      const pdfContent = this.$refs['pdf-detail']
      if (!pdfContent) {
        console.log('未找到容器')
        return false
      }
      const page = await this.pdf.getPage(currentpage || this.currentPage) // 调用getPage方法传入当前循环的页数,返回一个page对象
      const viewport = await page.getViewport(this.myscale)
      let canvas
      if (!pdfContent.querySelector('canvas') || createNewWrap) { // 如果一个页面渲染多个PDF页就创建多个canvas来展示，createNewWrap为true就创建多个一次性展示
        canvas = document.createElement('canvas')
        canvas.id = `canvas${currentpage || ''}`
        canvas.classList = 'pdfCanvas'
        canvas.style = 'transition:all 0.3s ease 0.3s;transform: scale(0deg);'
      } else {
        canvas = pdfContent.querySelector('canvas')
      }
      const context = canvas.getContext('2d') // 创建绘制canvas的对象
      // context.clearRect(0, 0, this.height, this.width)
      // this.height = viewport.height
      // this.width = viewport.width
      context.clearRect(0, 0, viewport.height, viewport.width) // 清除原来的内容
      canvas.height = viewport.height // 定义canvas高和宽
      canvas.width = viewport.width
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      }
      await page.render(renderContext)
      pdfContent.appendChild(canvas)
    },
    getObjectURL(file) {
      let url = null
      if (window.createObjectURL !== undefined) { // basic
        url = window.createObjectURL(file)
      } else if (window.webkitURL !== undefined) { // webkit or chrome
        try {
          url = window.webkitURL.createObjectURL(file)
        } catch (e) {
          console.log(e)
        }
      } else if (window.URL !== undefined) { // mozilla(firefox)
        try {
          url = window.URL.createObjectURL(file)
        } catch (e) {
          console.log(e)
        }
      }
      return url
    },
    print() { // 打印canvas
      var w; var iframe = document.createElement('iframe')
      var f = document.body.appendChild(iframe)
      this.iframe = iframe
      iframe.id = 'myIframe'
      // iframe.style = "position:absolute;width:0;height:0;top:-10px;left:-10px;";
      iframe.setAttribute('style', 'position: absolute; width: 0;height: 0;top: 0;left: 0;')
      w = f.contentWindow || f.contentDocument
      f.src = this.src
      var _this = this
      iframe.onload = function() {
        _this.toPrint(w)
        setTimeout(function() {
          // document.body.removeChild(iframe)
        }, 10000)
      }
    },
    toPrint(frameWindow) {
      try {
        setTimeout(function() {
          frameWindow.focus()
          try {
            if (!frameWindow.document.execCommand('print', false, null)) {
              frameWindow.print()
            }
          } catch (e) {
            frameWindow.print()
          }
          frameWindow.close()
        }, 10)
      } catch (err) {
        console.log('err', err)
      }
    },
    closeFun() {
      if (this.iframe) {
        document.body.removeChild(this.iframe)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.file-detial,.paginWrapper{
  text-align: center;
}
.file-detial.fullScreen{
 position: absolute;
  z-index: 1;
  right: 0;
  left: 0;
  padding: 30px;
  overflow: auto;
  height: 100vh;
}
.close{
  height: 44px;
  width: 44px;
  color: #fff;
  position: absolute;
  right: 0;
  margin: 40px;
  cursor: pointer;
  z-index: 3;
}
.rotate-left{
  transform:rotateY(180deg);
}
.action-icon{
  color: #fff;
  margin: 7px 10px;
  font-size:20px;
   cursor: pointer;
}
.svg-icon{
    vertical-align: 0;
}
.pdf-viewer__actions__inner{
  line-height: 44px;
  /deep/ .el-pagination *{
    background-color: transparent;
    color: #fff;
    line-height: 44px;
    height: 44px;
  }
  /deep/ .el-pagination .active{
    color: #50C3A2;
  }
}
.pdf-viewer__wrapper{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
}
.pdf-viewer__mask{
  position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: .5;
    background: #000;
}
.pdf-viewer__btn{
    right: 40px;
    width: 40px;
    height: 40px;
    font-size: 40px;
}
.pdf-viewer__close{
    position: absolute;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    opacity: .8;
    cursor: pointer;
    box-sizing: border-box;
    user-select: none;
}
.pdf-viewer__actions{
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    height: 44px;
    padding: 0 23px;
    text-align: center;
    background-color: #606266a8;
    border-color: #fff;
    border-radius: 22px;
    z-index: 2;
}
.bottom-action{
    bottom: 30px;
    width:282px;
}
.top-action{
    top:30px;
    width: 444px;
}
// 滚动条样式，底层也出现滚动条的话就很丑
// div::-webkit-scrollbar{
//   width:10px;
//   height:10px;
//   /**/
// }
// div::-webkit-scrollbar-track{
//   background: rgb(239, 239, 239);
//   border-radius:2px;
// }
// div::-webkit-scrollbar-thumb{
//   background: #bfbfbf;
//   border-radius:10px;
// }
// div::-webkit-scrollbar-thumb:hover{
//   background: #333;
// }
// div::-webkit-scrollbar-corner{
//   background: #179a16;
// }
</style>
