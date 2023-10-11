<script setup>
import {reactive} from 'vue'
import {login as loginOSS} from '@/utils/oss.js'
import {getBowerId, encrypt} from '@/utils/security.js'
import {ElNotification} from 'element-plus'
import store from "@/store/index.js";
import {useRouter} from "vue-router";

const router = useRouter()

const ruleFormRef = ref()

const ossForm = reactive({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAI5tNtsokaNJXbfpCDYmAc',
  accessKeySecret: 'vdsdduX2iMNoVrkjIDOG4SRCLUM4QR',
  bucket: 'password-x',
})

const formRules = reactive({
  region: [
    {required: true, message: '请输入region', trigger: 'blur'}
  ],
  accessKeyId: [
    {required: true, message: '请输入accessKeyId', trigger: 'blur'}
  ],
  accessKeySecret: [
    {required: true, message: '请输入accessKeySecret', trigger: 'blur'}
  ],
  bucket: [
    {required: true, message: '请输入bucket', trigger: 'blur'}
  ]
})

// 登录
const submitForm = async (ruleFormRef) => {
  await ruleFormRef.validate((valid) => {
    if (!valid) {
      return
    }

    // 登录阿里oss
    loginOSS(ossForm).then(oss => {
      loginSucceed(oss)
    }).catch((err) => {
      loginFail(err)
    })
  })
}

// 登录成功
const loginSucceed = (oss) => {
  // 保存全局状态
  store.commit('setOss', oss)
  // 获取浏览器指纹
  let bowerId = getBowerId();
  // 使用浏览器指纹加密oss配置信息
  let ciphertext = encrypt(bowerId, JSON.stringify(ossForm))
  // 保存到localStorage用于下次登录
  localStorage.setItem('ossForm', ciphertext)

  ElNotification.success('登录成功');

  router.push('/')
}

// 登录失败
const loginFail = (err) => {
  let message = err.code;
  if (err.code === 'RequestError') {
    message = '请检查：桶名称、跨域设置、region配置'
  } else if (err.code === 'InvalidAccessKeyId') {
    message = 'accessKeyId错误'
  } else if (err.code === 'SignatureDoesNotMatch') {
    message = 'accessKeySecret错误'
  } else if (err.code === 'AccessDenied') {
    message = '用户没有访问OSS权限'
  }
  ElNotification({
    type: 'error',
    title: '登录失败',
    message: message,
  })
}
</script>

<template>
  <img alt="" class="back-img"
       src="~@/assets/images/backImg.svg">
  <div class="content">
    <div class="content-input">
      <div class="title">
        阿里云OSS配置
      </div>
      <el-form ref="ruleFormRef" :rules="formRules" :model="ossForm">
        <el-form-item prop="region">
          <el-input v-model="ossForm.region" clearable placeholder="OSS region"></el-input>
        </el-form-item>
        <el-form-item prop="accessKeyId">
          <el-input v-model="ossForm.accessKeyId" clearable placeholder="OSS accessKeyId"></el-input>
        </el-form-item>
        <el-form-item prop="accessKeySecret">
          <el-input v-model="ossForm.accessKeySecret" clearable placeholder="OSS accessKeySecret"></el-input>
        </el-form-item>
        <el-form-item prop="bucket">
          <el-input v-model="ossForm.bucket" clearable placeholder="OSS bucket"></el-input>
        </el-form-item>
      </el-form>

      <div class="content-button">
        <el-button type="primary" style="width: 100%;" @click="submitForm(ruleFormRef)">登录</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.back-img {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1
}

.content {
  width: 500px;
  height: 400px;
  box-sizing: border-box;
  padding: 0 50px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(105, 105, 105, 0.1);
  background: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: loginMove 0.8s ease-in-out alternate;
  overflow: hidden;
  transition: 1.5s;
}

@keyframes loginMove {
  0% {
    height: 0;
  }

  100% {
    height: 400px;
  }
}

.content-input {
  width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}

.content-button {
  margin-top: 10px;
}


.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 30px;
  padding-top: 0;
  margin-top: 0;
  font-weight: bold;
  color: #606266;
}

</style>
