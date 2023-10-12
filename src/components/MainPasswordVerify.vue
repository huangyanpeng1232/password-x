<script setup>
import {useI18n} from "vue-i18n";

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
  emit('verifyPass','123')
  alertVisStatus.verifyMainPassword = false
}

// 验证主密码
const verifyMainPassword = (text) => {
  ciphertext.value = text
  alertVisStatus.verifyMainPassword = true
}

defineExpose({
  verifyMainPassword
});

</script>

<template>
  <el-dialog
      v-model="alertVisStatus.verifyMainPassword"
      :title="t('mainPasswordVerify.form.title')"
      width="400px"
  >
    <el-form label-width="60px" :inline="true">
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