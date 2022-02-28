<template>
  <div
    class="title"
    :style="{
      '--pointColor': pointColor,
    }"
  >
    <!-- <span class="dot" :style="{background:pointColor}" /> -->
    {{ title }}
    <slot />
  </div>
</template>

<script>

export default {
  name: 'CTitle',
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    },
    pointColor: {
      type: String,
      default: '#6f7dbf'
    }
  },
  data() {
    return {
    }
  },
  computed: {

  },
  created() {
  },
  methods: {
  }
}
</script>
<style lang='scss' scoped>
  .title{
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0px;
    color: $fontColor;
    margin-bottom: 20px;
    .dot{
       height:8px;
      width:8px;
      display:inline-block;
      border-radius:50%;
      margin-right: 5px;
      margin-bottom: 2px;
    }
    &:before{
      content:'';
      height:8px;
      width:8px;
      display:inline-block;
      background:var(--pointColor);
      border-radius:50%;
      margin-right: 5px;
      margin-bottom: 2px;
    }
  }
</style>
