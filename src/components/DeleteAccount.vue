<!--注销账号-->
<script setup>
import {useI18n} from "vue-i18n";
import {decrypt, getBowerId} from "@/utils/security.js";
import {delFile} from "@/database/index.js";
import store from "@/store/index.js";

const {t} = useI18n()

// 声明此组件可能调用的事件
const emit = defineEmits(['deleteAccount'])
// 手势密码组件对象
const gesturePasswordRef = ref()

// 弹框显示控制
const alertVisStatus = reactive({
  deleteAccount: false
})
// 密码类型
const mainPasswordType = ref('')
// 主密码
const mainPassword = ref('')

// 确认注销账号
const affirmDeleteAccount = () => {
  // 验证主密码
  let value = decrypt(mainPassword.value, store.state.verifyCode)
  if (value && value === 'password-x') {

    if (mainPasswordType.value === 'gesture') {
      gesturePasswordRef.value.setVerifyStatus('pass')
    }

    // 演示账号不能注销
    let ciphertext = localStorage.getItem('databaseForm')
    let formContent = decrypt(getBowerId(), ciphertext);
    let form = JSON.parse(formContent);
    if (!import.meta.env.DEV && form.keyId === import.meta.env.VITE_DEMO_ACCESS_KEY_ID) {
      ElMessage.error('演示账号不能注销')
      return
    }

    // 删除密码文件
    delFile('password.json')
    // 删除分组文件
    delFile('labelTree.json')

    // 删除系统配置
    localStorage.removeItem('systemConfig')
    // 提示注销成功
    ElMessage.success(t('systemSetting.deleteAccount.success'));
    // 退出登录
    emit('deleteAccount')
  } else {
    // 主密码验证未通过
    if (mainPasswordType.value === 'common') {
      ElMessage.error(t('systemSetting.deleteAccount.mainPasswordError'))
    } else {
      gesturePasswordRef.value.setVerifyStatus('fail')
    }
  }
}

// 注销账号
const showDeleteAccount = () => {
  // 设置密码类型
  mainPasswordType.value = store.state.mainPasswordType

  alertVisStatus.deleteAccount = true
}

// 手势密码输入完成
const gestureComplete = (password) => {
  mainPassword.value = password
  affirmDeleteAccount()
}

// 全屏
const fullscreen = ref(document.documentElement.clientWidth < 728)

window.addEventListener('resize', function () {
  fullscreen.value = document.documentElement.clientWidth < 728
});

// 导出方法
defineExpose({
  showDeleteAccount
});
</script>

<template>
  <el-dialog
      :fullscreen="fullscreen"
      v-model="alertVisStatus.deleteAccount"
      :title="t('systemSetting.deleteAccount')"
      width="400px"
  >
    <el-alert type="error" :closable="false">
      {{ t('systemSetting.deleteAccount.text') }}
    </el-alert>
    <div style="text-align: center">
      <GesturePassword v-if="mainPasswordType === 'gesture'" ref="gesturePasswordRef"
                       @complete="gestureComplete"></GesturePassword>
      <el-input v-if="mainPasswordType === 'common'" v-model="mainPassword" style="margin-top: 20px"></el-input>
    </div>

    <template #footer v-if="mainPasswordType === 'common'">
          <span class="dialog-footer">
            <el-button type="danger" @click="affirmDeleteAccount">{{ t('systemSetting.deleteAccount.affirm') }}</el-button>
          </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>