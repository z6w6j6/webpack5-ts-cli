<template>
  <div class='c-login'>
   <div class="login-wrap">
     <div class="title">
        登录
     </div>
    <c-form
      ref="form"
      class="cform"
      myref="formRef"
      :rules="rules"
      :form="formData"
      :formSetting="formSetting"
      :schema="schema">
    </c-form>
    <div class="btns">
      <el-button type="primary" @click="saveAction">登录</el-button>
    </div>
   </div>
  </div>
</template>

<script language="ts">
const fromSchema = {
  education: {
    field: 'account',
    label: '账号',
    type: 'input',
    span: 22
  },
  degree: {
    field: 'password',
    label: '密码',
    type: 'input',
    span: 22
  }
}
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'CLogin',
  components: {
  },
  setup() {
    const formData = ref({ account: 'hhh', password: 'hhh' })
    const schema = ref(fromSchema)
    const form = ref(null)
    onMounted(() => {
      console.log(form)
    })
    const rules = ref({
      account: [{ required: true, message: '请输入账号' }],
      password: [{ required: true, message: '请输入密码' }]
    })
    const subLoading = ref(false)
    const router = useRouter()
    const formSetting = ref({ labelWidth: '70px' })
    const saveAction = async() => {
      if (formData.value.account === 'hhh' && formData.value.password === 'hhh') {
        router.push('/')
      } else {
        ElMessage.error('用户名或密码有误')
      }
    }
    return {
      formData,
      schema,
      rules,
      subLoading,
      formSetting,
      saveAction
    }
  }
})
</script>

<style lang='scss' scoped>
.c-login{
  background-image: url('../../assets/img/login.png');
  height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .login-wrap{
    background: #fff;
    border: 1px solid #eee;
    border-radius: 10px;
    width: 400px;
    padding: 20px;
    float: right;
    margin-right: 300px;
    margin-top: 300px;
    .title{
      color: #222;
      text-align: center;
      font-weight: 600;
      font-size: 16px;
      padding-bottom: 20px;
    }
    .btns{
      text-align: center;
    }
  }
}
</style>
