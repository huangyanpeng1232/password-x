<script setup>
import {ElMessage} from 'element-plus'
import {useI18n} from "vue-i18n";

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
  }
  if (mainPassword.value !== affirmMainPassword.value) {
    ElMessage.error(t('mainPasswordSetting.form.passwordsDiff'))
    return
  }
  emit('mainPasswordChange',mainPassword)
}

// 初始化主密码
const initMainPassword = () => {
  alertMode.value = 'init'
}

// 修改主密码
const updateMainPassword = (text) => {
  ciphertext.value = text
  alertMode.value = 'update'
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
  >
    <el-form label-width="60px" :inline="true">
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