<script setup>
import {ElMessage} from 'element-plus'
import {useI18n} from "vue-i18n";
import {decrypt, encrypt, getBowerId} from "@/utils/security.js";
import {getSystemConfig} from "@/utils/global.js";

const {t} = useI18n()
// 事件声明
const emit = defineEmits(['mainPasswordChange'])

// 现在的主密码
const oldMainPassword = ref('')
// 主密码
const mainPassword = ref('')
// 确认主密码
const affirmMainPassword = ref('')
// 密文
const ciphertext = ref('')

// 弹框显示控制
const alertVisStatus = reactive({
  mainPassword: false
})

// 弹框模式
const alertMode = ref('')

// 保存主密码
const saveMainPassword = () => {
  if(alertMode.value === 'update'){
    // 验证主密码
    let value = decrypt(oldMainPassword.value, ciphertext.value)
    console.log(value)
    if (!value || value !== 'password-x') {
      ElMessage.error(t('mainPasswordSetting.form.mainPasswordError'))
      return
    }
  }
  if (mainPassword.value !== affirmMainPassword.value) {
    ElMessage.error(t('mainPasswordSetting.form.passwordsDiff'))
    return
  }
  // 通知主页密码变更
  emit('mainPasswordChange', mainPassword.value)

  let cacheMainPassword = getSystemConfig('cacheMainPassword')
  if(cacheMainPassword || cacheMainPassword == null){
    // 保存到本地缓存
    let bowerId = getBowerId();
    let mainPasswordCiphertext = encrypt(bowerId, mainPassword.value)
    localStorage.setItem('mainPasswordCiphertext', mainPasswordCiphertext)
  }

  // 清空表单
  oldMainPassword.value = ''
  mainPassword.value = ''
  affirmMainPassword.value = ''

  alertVisStatus.mainPassword = false
}

// 初始化主密码
const initMainPassword = () => {
  alertMode.value = 'init'
  alertVisStatus.mainPassword = true
}

// 修改主密码
const updateMainPassword = (text) => {
  ciphertext.value = text
  alertMode.value = 'update'
  alertVisStatus.mainPassword = true
}

defineExpose({
  initMainPassword,
  updateMainPassword
});

</script>

<template>
  <el-dialog
      v-model="alertVisStatus.mainPassword"
      :title="t('mainPasswordSetting.form.setMainPassword')"
      width="400px"
      :close-on-click-modal="alertMode === 'update'"
      :close-on-press-escape="alertMode === 'update'"
      :show-close="alertMode === 'update'"
  >
    <el-form :inline="true" label-width="90px">
      <el-form-item v-if="alertMode === 'update'" :label="t('mainPasswordSetting.form.currentPassword')">
        <el-input type="password" v-model="oldMainPassword"
                  style="width: 231px"></el-input>
      </el-form-item>
      <el-form-item :label="t('mainPasswordSetting.form.newMainPassword')">
        <el-input type="password" v-model="mainPassword"
                  style="width: 231px"></el-input>
      </el-form-item>
      <el-form-item :label="t('mainPasswordSetting.form.newMainPasswordAffirm')">
        <el-input type="password" v-model="affirmMainPassword"
                  style="width: 231px"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" :disabled="!mainPassword" @click="saveMainPassword">{{ t('mainPasswordSetting.form.save')}}</el-button>
          </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>