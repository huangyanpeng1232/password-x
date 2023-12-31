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

// 主密码验证组件对象
const mainPasswordVerifyRef = ref()
// 手势密码组件对象
const gesturePasswordRef = ref()

// 密码类型
const passwordType = ref('gesture')
// 主密码
const mainPassword = ref('')
// 确认主密码
const affirmMainPassword = ref('')
// 弹框显示控制
const alertVisStatus = reactive({
  mainPassword: false
})

// 当前阶段: setting、affirm
const passwordStep = ref('')

// 手势密码绘制完成
const gestureComplete = (password) => {
  if (passwordStep.value === 'setting') {
    mainPassword.value = password
    passwordStep.value = 'affirm'
    gesturePasswordRef.value.setVerifyStatus('')
  } else if (passwordStep.value === 'affirm') {
    affirmMainPassword.value = password
    saveMainPassword()
  }
}

// 保存主密码
const saveMainPassword = () => {

  // 校验两次密码是否一致
  if (mainPassword.value !== affirmMainPassword.value) {
    ElMessage.error(t('mainPasswordSetting.form.passwordsDiff'))
    return
  }

  // 演示账号不能修改/设置主密码
  let ciphertext = localStorage.getItem('databaseForm')
  let formContent = decrypt(getBowerId(), ciphertext);
  let form = JSON.parse(formContent);
  if (!import.meta.env.DEV && form.accessKeyId === import.meta.env.VITE_DEMO_ACCESS_KEY_ID) {
    ElMessage.error('演示账号不能修改主密码')
    return
  }

  if (passwordType.value === 'gesture') {
    store.commit('setMainPasswordType', 'gesture')
  } else {
    store.commit('setMainPasswordType', 'common')
  }

  // 触发密码变更事件
  emit('mainPasswordChange', mainPassword.value, passwordType.value);

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
  mainPassword.value = ''
  affirmMainPassword.value = ''
  alertVisStatus.mainPassword = false
}

// 设置主密码
const settingMainPassword = () => {
  passwordStep.value = 'setting'
  alertVisStatus.mainPassword = true
}

// 修改主密码
const updateMainPassword = () => {
  mainPasswordVerifyRef.value.verifyMainPassword(false)
}

// 点击tab
const tabChange = () => {
  if (passwordType.value === 'gesture') {
    passwordStep.value = 'setting';
  }
  mainPassword.value = ''
  affirmMainPassword.value = ''
}

// 全屏
const fullscreen = ref(document.documentElement.clientWidth < 728)

window.addEventListener('resize', function(){
  fullscreen.value = document.documentElement.clientWidth < 728
});

// 导出方法
defineExpose({
  settingMainPassword,
  updateMainPassword
});

</script>

<template>
  <el-dialog
      :fullscreen="fullscreen"
      v-model="alertVisStatus.mainPassword"
      :title="t('mainPasswordSetting.form.setMainPassword')"
      width="470px"
  >
    <el-alert type="error" style="position: relative;top: -10px" :closable="false">
      {{ t('mainPasswordSetting.forget.message') }}
    </el-alert>
    <el-tabs
        v-model="passwordType"
        style="margin-top: 10px"
        type="card"
        @tabChange="tabChange"
    >
      <el-tab-pane :label="t('mainPasswordSetting.passwordType.gesture')" name="gesture" style="text-align: center">
        <div>
          <el-text v-if="passwordStep === 'setting'">{{ t('mainPasswordSetting.gesture.first') }}</el-text>
          <el-text v-if="passwordStep === 'affirm'">{{ t('mainPasswordSetting.gesture.affirm') }}</el-text>
        </div>
        <GesturePassword v-if="alertVisStatus.mainPassword && passwordType === 'gesture'" ref="gesturePasswordRef"
                         @complete="gestureComplete"></GesturePassword>
        <div>
          <el-link :underline="false" style="position: relative;top: -2px;" type="primary"
                   @click="passwordStep = 'setting'">{{ t('mainPasswordSetting.gesture.reset') }}
          </el-link>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="t('mainPasswordSetting.passwordType.common')" name="common" style="text-align: center">
        <el-form :inline="true" label-width="100px" style="margin-top: 20px">
          <el-form-item :label="t('mainPasswordSetting.form.newMainPassword')">
            <el-input type="password" v-model="mainPassword"
                      style="width: 231px"></el-input>
          </el-form-item>
          <el-form-item :label="t('mainPasswordSetting.form.newMainPasswordAffirm')">
            <el-input type="password" v-model="affirmMainPassword"
                      style="width: 231px"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <template #footer v-if="passwordType === 'common'">
          <span class="dialog-footer">
            <el-button type="primary" :disabled="!mainPassword" @click="saveMainPassword">{{ t('mainPasswordSetting.form.save')}}</el-button>
          </span>
    </template>
  </el-dialog>

  <!--  验证主密码-->
  <MainPasswordVerify ref="mainPasswordVerifyRef" @verifyPass="settingMainPassword"></MainPasswordVerify>
</template>

<style scoped>

</style>