<!--主密码验证-->
<script setup>
import {useI18n} from "vue-i18n";
import {decrypt, encrypt, getBowerId} from "@/utils/security.js";

import {getSystemConfig} from "@/utils/global.js";
import store from "@/store/index.js";

const {t} = useI18n()
// 声明此组件可能调用的事件
const emit = defineEmits(['verifyPass'])

// 主密码
const mainPassword = ref('')
// 密码类型
const mainPasswordType = ref('')
// 弹框显示控制
const alertVisStatus = reactive({
  verifyMainPassword: false
})

// 手势密码输入完成
const gestureComplete = (password) => {
  mainPassword.value = password
  saveMainPassword()
}

// 保存主密码
const saveMainPassword = () => {
  // 验证主密码是否正确
  let value = decrypt(mainPassword.value, store.state.verifyCode)
  if (value && value === 'password-x') {
    // 触发验证通过事件
    emit('verifyPass', mainPassword.value)
    // 缓存密码到本地
    setLocalMainPassword(mainPassword.value)
    // 清空表单中的主密码
    mainPassword.value = ''
    // 隐藏弹框
    alertVisStatus.verifyMainPassword = false
  } else {
    // 主密码验证未通过
    ElMessage.error(t('mainPasswordVerify.form.verify'))
  }
}

// 删除本地缓存中的主密码
const delLocalMainPassword = () => {
  localStorage.removeItem('mainPasswordCiphertext')
}

// 设置本地缓存中主密码
const setLocalMainPassword = (password) => {
  // 获取系统配置-是否缓存主密码
  let cacheMainPassword = getSystemConfig('cacheMainPassword')
  if(cacheMainPassword === false){
    return
  }

  let bowerId = getBowerId();
  let mainPasswordCiphertext = encrypt(bowerId, password)
  localStorage.setItem('mainPasswordCiphertext', mainPasswordCiphertext)
}

// 获取本地缓存中的主密码
const getLocalMainPassword = () => {
  // 获取系统配置-是否缓存主密码
  let cacheMainPassword = getSystemConfig('cacheMainPassword')
  if(cacheMainPassword === false){
    return null
  }

  // 获取本地缓存中的主密码
  let mainPasswordCiphertext = localStorage.getItem('mainPasswordCiphertext')
  if (!mainPasswordCiphertext) {
    return null;
  }
  // 获取浏览器指纹
  let bowerId = getBowerId();
  // 使用浏览器指纹界面本地缓存中的主密码
  let localMainPassword = decrypt(bowerId, mainPasswordCiphertext)
  if (localMainPassword) {
    // 获取成功
    return localMainPassword;
  } else {
    return null;
  }
}

// 验证主密码
const verifyMainPassword = (cache = true) => {

  // 设置密码类型
  mainPasswordType.value = store.state.mainPasswordType

  if (!cache) {
    // 不适用本地缓存中的密码进行自动验证
    alertVisStatus.verifyMainPassword = true
    return
  }

  // 获取本地缓存中的主密码
  let localMainPassword = getLocalMainPassword();

  if (!localMainPassword) {
    // 缓存中没有主密码显示密码验证框
    alertVisStatus.verifyMainPassword = true
    return
  }
  // 验证缓存中的主密码是否正确
  let value = decrypt(localMainPassword, store.state.verifyCode)
  if (value && value === 'password-x') {
    // 触发验证通过事件
    emit('verifyPass', localMainPassword)
  } else {
    // 缓存中的主密码验证未通过显示密码验证框
    alertVisStatus.verifyMainPassword = true
  }
}

// 导出的方法
defineExpose({
  verifyMainPassword,
  delLocalMainPassword
});

</script>

<template>
  <el-dialog
      v-model="alertVisStatus.verifyMainPassword"
      :title="t('mainPasswordVerify.form.title')"
      width="400px"
  >
    <div style="text-align: center">
      <GesturePassword v-if="mainPasswordType === 'gesture'" @complete="gestureComplete"></GesturePassword>
      <el-form style="padding: 10px" v-if="mainPasswordType === 'common'">
        <el-form-item>
          <el-input
              v-model="mainPassword"
              :placeholder="t('mainPasswordVerify.form.mainPassword')"
              type="password"
              @keyup.enter="saveMainPassword"
          >
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer v-if="mainPasswordType === 'common'">
          <span class="dialog-footer">
            <el-button type="primary" :disabled="!mainPassword" @click="saveMainPassword">{{t('mainPasswordVerify.form.save')}}</el-button>
          </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>