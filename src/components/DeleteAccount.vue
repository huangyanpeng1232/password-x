<!--注销账号-->
<script setup>
import {useI18n} from "vue-i18n";
import {decrypt} from "@/utils/security.js";
import {ElMessage} from "element-plus";
import {delFile} from "@/utils/oss.js";

// 声明此组件可能调用的事件
const emit = defineEmits(['deleteAccount'])

const {t} = useI18n()

// 弹框显示控制
const alertVisStatus = reactive({
  deleteAccount: false
})

// 主密码
const mainPassword = ref('')
// 密码验证字符串
const ciphertext = ref('')

// 确认注销账号
const affirmDeleteAccount = () => {
  // 验证主密码
  let value = decrypt(mainPassword.value, ciphertext.value)
  if (value && value === 'password-x') {
    // 删除密码文件
    delFile('password.json')
    // 删除分组文件
    delFile('groupTree.json')
    // 删除oss登录信息
    localStorage.removeItem('ossForm')
    // 删除主密码缓存
    localStorage.removeItem('mainPasswordCiphertext')
    // 删除系统配置
    localStorage.removeItem('systemConfig')
    // 触发注销事件
    emit('affirmDeleteAccount')
  } else {
    ElMessage.error(t('systemSetting.deleteAccount.mainPasswordError'))
  }
}

// 注销账号
const showDeleteAccount = (text) => {
  ciphertext.value = text
  alertVisStatus.deleteAccount = true
}

// 导出方法
defineExpose({
  showDeleteAccount
});
</script>

<template>
  <el-dialog v-model="alertVisStatus.deleteAccount" :title="t('systemSetting.deleteAccount')" width="400px">
    <el-text type="danger">{{ t('systemSetting.deleteAccount.text') }}</el-text>
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