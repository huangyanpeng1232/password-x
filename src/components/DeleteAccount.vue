<script setup>
import {useI18n} from "vue-i18n";
import {decrypt} from "@/utils/security.js";
import {ElMessage} from "element-plus";
// 事件声明
const emit = defineEmits(['deleteAccount'])

const {t} = useI18n()
const deleteAccountVis = ref(false)
const mainPassword = ref('')
const ciphertext = ref('')

// 确认注销账号
const affirmDeleteAccount = () => {

  // 验证主密码
  let value = decrypt(mainPassword.value, ciphertext.value)
  if (!value || value !== 'password-x') {
    ElMessage.error(t('systemSetting.deleteAccount.mainPasswordError'))
    return
  }
  emit('affirmDeleteAccount')
}

// 注销账号
const deleteAccount = (text) => {
  ciphertext.value = text
  deleteAccountVis.value = true
}

defineExpose({
  deleteAccount
});
</script>

<template>
  <el-dialog width="400px" :title="t('systemSetting.deleteAccount.affirm')" v-model="deleteAccountVis">
    {{t('systemSetting.deleteAccount.text')}}
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