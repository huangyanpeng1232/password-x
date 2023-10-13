<script setup>
import {useI18n} from "vue-i18n";
import {decrypt, encrypt, getBowerId} from "@/utils/security.js";
import {ElMessage} from "element-plus";
import {getSystemConfig} from "@/utils/global.js";

const {t} = useI18n()
// 事件声明
const emit = defineEmits(['verifyPass'])

// 主密码
const mainPassword = ref('')
// 密文
const ciphertext = ref('')

// 弹框显示控制
const alertVisStatus = reactive({
  verifyMainPassword: false
})

// 保存主密码
const saveMainPassword = () => {
  let value = decrypt(mainPassword.value, ciphertext.value)
  if (value && value === 'password-x') {
    // 通知主页面
    emit('verifyPass', mainPassword.value)
    // 缓存密码
    setLocalMainPassword(mainPassword.value)
    // 清空表单
    mainPassword.value = ''
    // 隐藏弹框
    alertVisStatus.verifyMainPassword = false
  } else {
    ElMessage.error(t('mainPasswordVerify.form.verify'))
  }
}

// 删除本地缓存中的主密码
const delLocalMainPassword = (password) => {
  localStorage.removeItem('mainPasswordCiphertext')
}
// 设置本地缓存中主密码
const setLocalMainPassword = (password) => {
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
  let cacheMainPassword = getSystemConfig('cacheMainPassword')
  if(cacheMainPassword === false){
    return null
  }

  let mainPasswordCiphertext = localStorage.getItem('mainPasswordCiphertext')
  if (!mainPasswordCiphertext) {
    return null;
  }
  let bowerId = getBowerId();
  let localMainPassword = decrypt(bowerId, mainPasswordCiphertext)
  if (localMainPassword) {
    return localMainPassword;
  } else {
    return null;
  }
}

// 验证主密码
const verifyMainPassword = (text) => {
  ciphertext.value = text
  let localMainPassword = getLocalMainPassword();
  if (!localMainPassword) {
    alertVisStatus.verifyMainPassword = true
    return
  }
  let value = decrypt(localMainPassword, text)
  if (value && value === 'password-x') {
    emit('verifyPass', localMainPassword)
  } else {
    alertVisStatus.verifyMainPassword = true
  }
}

defineExpose({
  verifyMainPassword,
  delLocalMainPassword
});

</script>

<template>
  <el-dialog
      v-model="alertVisStatus.verifyMainPassword"
      :title="t('mainPasswordVerify.form.title')"
      width="450px"
  >
    <el-form label-width="120px" :inline="true">
      <el-form-item :label="t('mainPasswordVerify.form.mainPassword')">
        <el-input type="password" @keyup.enter="saveMainPassword" v-model="mainPassword"
                  style="width: 231px"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" :disabled="!mainPassword" @click="saveMainPassword">{{t('mainPasswordVerify.form.save')}}</el-button>
          </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>