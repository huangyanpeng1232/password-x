<!--注销账号-->
<script setup>
import {useI18n} from "vue-i18n";
import {decrypt, getBowerId} from "@/utils/security.js";
import {delFile} from "@/utils/oss.js";
import store from "@/store/index.js";

const {t} = useI18n()

// 声明此组件可能调用的事件
const emit = defineEmits(['deleteAccount'])

// 弹框显示控制
const alertVisStatus = reactive({
  deleteAccount: false
})

// 主密码
const mainPassword = ref('')

// 确认注销账号
const affirmDeleteAccount = () => {
  // 验证主密码
  let value = decrypt(mainPassword.value, store.state.verifyCode)
  if (value && value === 'password-x') {

    // 演示账号不能注销
    let ciphertext = localStorage.getItem('ossForm')
    let ossFormContent = decrypt(getBowerId(), ciphertext);
    let ossForm = JSON.parse(ossFormContent);
    if (ossForm.accessKeyId === import.meta.env.VITE_DEMO_ACCESS_KEY_ID) {
      ElMessage.error('演示账号不能注销')
      return
    }

    // 删除密码文件
    delFile('password.json')
    // 删除分组文件
    delFile('groupTree.json')

    // 删除系统配置
    localStorage.removeItem('systemConfig')
    // 提示注销成功
    ElMessage.success(t('systemSetting.deleteAccount.success'));
    // 退出登录
    emit('deleteAccount')
  } else {
    ElMessage.error(t('systemSetting.deleteAccount.mainPasswordError'))
  }
}

// 注销账号
const showDeleteAccount = () => {
  alertVisStatus.deleteAccount = true
}

// 导出方法
defineExpose({
  showDeleteAccount
});
</script>

<template>
  <el-dialog v-model="alertVisStatus.deleteAccount" :title="t('systemSetting.deleteAccount')" width="400px">
    <el-alert type="error" :closable="false">
      {{ t('systemSetting.deleteAccount.text') }}
    </el-alert>
    <el-input v-model="mainPassword" style="margin-top: 20px"></el-input>
    <template #footer>
          <span class="dialog-footer">
            <el-button type="danger" @click="affirmDeleteAccount">{{ t('systemSetting.deleteAccount.affirm') }}</el-button>
          </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>