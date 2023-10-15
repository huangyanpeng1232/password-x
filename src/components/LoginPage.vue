<!--登录页-->
<script setup>
import {reactive} from 'vue'
import {login as loginOSS} from '@/utils/oss.js'
import {encrypt, getBowerId} from '@/utils/security.js'
import {getSystemConfig, setSystemConfig} from '@/utils/global.js'
import {ElNotification} from 'element-plus'
import store from "@/store/index.js";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {useDark} from "@vueuse/core";

const {t,locale} = useI18n()

const darkMode = useDark()

const router = useRouter()

// 登录表单规则校验
const ruleFormRef = ref()

// oss 配置
const ossForm = reactive({
  region: 'oss-cn-beijing',
  accessKeyId: '',
  accessKeySecret: '',
  bucket: 'password-x',
})

// 表单校验规则
const formRules = reactive({
  region: [
    {required: true, message: t('login.form.region.verify'), trigger: 'blur'}
  ],
  accessKeyId: [
    {required: true, message: t('login.form.accessKeyId.verify'), trigger: 'blur'}
  ],
  accessKeySecret: [
    {required: true, message: t('login.form.accessKeySecret.verify'), trigger: 'blur'}
  ],
  bucket: [
    {required: true, message: t('login.form.bucket.verify'), trigger: 'blur'}
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
  // 提示登录成功
  ElNotification.success(t('login.form.successMessage'));
  // 重定向到首页
  router.push('/')
}

// 登录失败
const loginFail = (err) => {
  let message = err.code;
  if (err.code === 'RequestError') {
    message = t('login.form.error.RequestError')
  } else if (err.code === 'InvalidAccessKeyId') {
    message = t('login.form.error.InvalidAccessKeyId')
  } else if (err.code === 'SignatureDoesNotMatch') {
    message = t('login.form.error.SignatureDoesNotMatch')
  } else if (err.code === 'AccessDenied') {
    message = t('login.form.error.AccessDenied')
  }
  // 提示失败原因
  ElNotification({
    type: 'error',
    title: t('login.form.failMessage'),
    message: message,
  })
}


// 修改语言
const changeLanguage = (language) => {
  locale.value = language
  // 修改系统配置
  setSystemConfig('language', language)
}

// 初始化系统配置
const initSystemConfig = () => {
  // 语言
  let language = getSystemConfig('language');
  if (language) {
    changeLanguage(language)
  } else {
    // 浏览器非中文则设置界面语言为英文
    if (navigator.language.toLowerCase() !== 'zh-cn') {
      locale.value = 'en-us'
      setSystemConfig('language', 'en-us')
    }
  }

  // 暗黑模式
  let sysDarkMode = getSystemConfig('darkMode');
  if (sysDarkMode) {
    darkMode.value = sysDarkMode
  } else {
    let isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (isDarkTheme && isDarkTheme.matches) {
      darkMode.value = true
      setSystemConfig('darkMode', true)
    }
  }
}

// 初始化系统配置
initSystemConfig()
</script>

<template>
  <img alt="" class="back-img" src="~@/assets/images/backImg.svg">
  <div class="content">
    <div class="language-div">
      <el-link
          :type="locale === 'zh-cn'?'primary':'default'"
          @click="changeLanguage('zh-cn')"
          :underline="false"
      >简体中文
      </el-link>
      /
      <el-link
          :type="locale === 'en-us'?'primary':'default'"
          @click="changeLanguage('en-us')"
          :underline="false"
      >English
      </el-link>
    </div>
    <div class="content-input">
      <div class="title">
        {{t('login.form.title')}}
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

.language-div {
  position: fixed;
  right: 0;
  padding: 10px;
  color: #999;
}
</style>
