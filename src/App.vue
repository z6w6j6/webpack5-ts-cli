<template>
    <div>
        <p class="title">{{title}}</p>
        <audio src="./assets/4秒.mp3">
            您的浏览器不支持 audio 标签。
        </audio>
         <!-- <video width="320" height="240" controls>
            <source src="./assets/4秒.mp4" type="video/mp4">
        </video> -->
        <video width="320" height="240" controls>
            <source src="./assets/VID_20210911_155955.mp4" type="video/mp4">
        </video>
        <svg-icon icon-class="add"></svg-icon>
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
    setup() {
        const title = ref('渐进式JavaScript 框架');

        return {
            title
        }
    }
})
</script>
<style scoped lang="scss">
.title{
    color: $blue;
    font-size: 16px;
}
</style>