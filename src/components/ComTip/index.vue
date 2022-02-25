<template>
  <div class="com-tip">
    <slot :toggleTip="toggleTip" />
    <div v-if="show && cusShow" class="com--tip-content" :class="styleClass">
      {{ msg }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComTip',
  props: {
    cusShow: {
      type: Boolean,
      default: false
    },
    msg: {
      type: String,
      default: null
    },
    styleClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false,
      type: null
    }
  },
  watch: {
    msg() {
      this.show = this.type && this.msg
    },
    type() {
      this.show = this.type && this.msg
    }
  },
  methods: {
    toggleTip(item) {
      this.type = item.type === 'focus'
    }
  }
}
</script>

<style lang='scss' scoped>
  .com--tip-content{
      border: 1px solid #e4e7ed;
      position: absolute;
      padding: 0 10px;
      border-radius: 5px;
      background: #fff;
      transform: scale(1.3);
      font-weight: 600;
      z-index: 1;
  }
  .com-tip{
    position: relative
  }
</style>
