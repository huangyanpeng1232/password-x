<!--修改/初始化主密码-->
<script setup>
import {ElMessage} from 'element-plus'
import {useI18n} from "vue-i18n";
import {decrypt, encrypt, getBowerId} from "@/utils/security.js";
import {getSystemConfig} from "@/utils/global.js";
import store from "@/store/index.js";

const {t} = useI18n()

// 声明此组件可能调用的事件
const emit = defineEmits(['mainPasswordChange'])

// 现在的主密码
const oldMainPassword = ref('')
// 主密码
const mainPassword = ref('')
// 确认主密码
const affirmMainPassword = ref('')
// 弹框显示控制
const alertVisStatus = reactive({
  mainPassword: false
})

// 弹框模式初始化/修改主密码
const alertMode = ref('')

// 保存主密码
const saveMainPassword = () => {
  // 修改主密码验证原密码是否正确
  if(alertMode.value === 'update'){
    // 验证主密码
    let value = decrypt(oldMainPassword.value, store.state.verifyCode)
    if (!value || value !== 'password-x') {
      ElMessage.error(t('mainPasswordSetting.form.mainPasswordError'))
      return
    }
  }
  // 校验两次密码是否一致
  if (mainPassword.value !== affirmMainPassword.value) {
    ElMessage.error(t('mainPasswordSetting.form.passwordsDiff'))
    return
  }
  // 触发密码变更事件
  emit('mainPasswordChange', mainPassword.value)

  // 获取系统配置是否缓存主密码
  let cacheMainPassword = getSystemConfig('cacheMainPassword')
  if(cacheMainPassword || cacheMainPassword == null){
    // 获取浏览器指纹
    let bowerId = getBowerId();
    // 使用浏览器指纹加密主密码
    let mainPasswordCiphertext = encrypt(bowerId, mainPassword.value)
    // 保存到本地缓存
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
const showUpdateMainPassword = () => {
  alertMode.value = 'update'
  alertVisStatus.mainPassword = true
}

// 导出方法
defineExpose({
  initMainPassword,
  showUpdateMainPassword
});

</script>

<template>
  <el-dialog
      v-model="alertVisStatus.mainPassword"
      :title="t('mainPasswordSetting.form.setMainPassword')"
      width="430px"
      :close-on-click-modal="alertMode === 'update'"
      :close-on-press-escape="alertMode === 'update'"
      :show-close="alertMode === 'update'"
  >
    <el-form :inline="true" label-width="100px" style="margin-top: 20px">
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
    <el-alert type="error" style="position: relative;top: 10px" :closable="false">
      {{ t('mainPasswordSetting.forget.message') }}
    </el-alert>
    <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" :disabled="!mainPassword" @click="saveMainPassword">{{ t('mainPasswordSetting.form.save')}}</el-button>
          </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>