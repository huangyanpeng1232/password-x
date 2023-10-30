<!--登录页-->
<script setup>
import {reactive} from 'vue'
import {login as loginDatabase} from '@/database/index.js'
import {encrypt, getBowerId} from '@/utils/security.js'
import {getSystemConfig, setSystemConfig} from '@/utils/global.js'
import {ElNotification} from 'element-plus'
import {useRoute, useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {useDark} from "@vueuse/core";


const {t,locale} = useI18n()

const darkMode = useDark()

const router = useRouter()

const route = useRoute ()

// 登录表单规则校验
const ruleFormRef = ref()

// database 配置
const databaseForm = reactive({
  type: 'cos',
  region: '',
  keyId: '',
  keySecret: '',
  bucket: '',
})

// 表单校验规则
const formRules = reactive({
  region: [
    {required: true, message: t('login.form.region.verify'), trigger: 'blur'}
  ],
  keyId: [
    {required: true, message: t('login.form.accessKeyId.verify'), trigger: 'blur'}
  ],
  keySecret: [
    {required: true, message: t('login.form.accessKeySecret.verify'), trigger: 'blur'}
  ],
  bucket: [
    {required: true, message: t('login.form.bucket.verify'), trigger: 'blur'}
  ]
})

// 打开oss注册指引
const openOssRegisterDoc = async () => {
  window.open(import.meta.env.VITE_OSS_REGISTER_DOC)
}

// 登录
const submitForm = async (ruleFormRef) => {
  await ruleFormRef.validate((valid) => {
    if (!valid) {
      return
    }

    // 登录数据库
    loginDatabase(databaseForm).then(database => {
      loginSucceed(database)
    }).catch((err) => {
      loginFail(err)
    })
  })
}

// 登录成功
const loginSucceed = () => {
  // 获取浏览器指纹
  let bowerId = getBowerId();
  // 使用浏览器指纹加密database配置信息
  let ciphertext = encrypt(bowerId, JSON.stringify(databaseForm))
  // 保存到localStorage用于下次登录
  let cacheDatabaseForm = getSystemConfig('cacheDatabaseForm')
  if (cacheDatabaseForm !== false) {
    localStorage.setItem('databaseForm', ciphertext);
  }
  // 重定向到首页
  router.push('/')
}

// 登录失败
const loginFail = (err) => {
  console.error(err)
  let message;
  if (err.code === 'RequestError') {
    message = t('login.form.error.RequestError')
  } else if (err.code === 'InvalidAccessKeyId') {
    message = t('login.form.error.InvalidAccessKeyId')
  } else if (err.code === 'SignatureDoesNotMatch') {
    message = t('login.form.error.SignatureDoesNotMatch')
  } else if (err.code === 'AccessDenied') {
    message = t('login.form.error.AccessDenied')
  } else{
    message = err.code
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


// 初始化登录参数
const initLoginConfig = () => {
  databaseForm.type = route.query.type || 'oss'
  databaseForm.region = route.query.region || ''
  databaseForm.keyId = route.query.keyId || ''
  databaseForm.keySecret = route.query.keySecret || ''
  databaseForm.bucket = route.query.bucket || ''
}

// 初始化系统配置
initSystemConfig()
// 初始化登录参数
initLoginConfig()
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
      <el-form ref="ruleFormRef" :model="databaseForm" :rules="formRules">
        <el-form-item prop="type">
          <el-radio-group v-model="databaseForm.type" style="margin: 0 auto">
            <el-radio-button label="oss">阿里OSS</el-radio-button>
            <el-radio-button label="cos">腾讯COS</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="region">
          <el-input v-model="databaseForm.region" clearable placeholder="region"></el-input>
        </el-form-item>
        <el-form-item prop="keyId">
          <el-input v-model="databaseForm.keyId" clearable placeholder="keyId"></el-input>
        </el-form-item>
        <el-form-item prop="keySecret">
          <el-input v-model="databaseForm.keySecret" clearable placeholder="keySecret"></el-input>
        </el-form-item>
        <el-form-item prop="bucket">
          <el-input v-model="databaseForm.bucket" clearable placeholder="bucket"></el-input>
        </el-form-item>
      </el-form>

      <div class="content-button">
        <el-button type="primary" style="width: 100%;" @click="submitForm(ruleFormRef)">登录</el-button>
      </div>
      <div class="oss-register-doc">
        <el-link type="primary" @click="openOssRegisterDoc">阿里云OSS注册指引</el-link>
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
  height: 450px;
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
    height: 450px;
  }
}

.content-input {
  width: 330px;
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

.oss-register-doc {
  text-align: center;
  padding: 10px;
  margin-top: 15px;
  color: #999;
}
</style>
