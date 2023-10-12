<script setup>
import {useI18n} from "vue-i18n";

const {t, locale} = useI18n()

// 弹框显示控制
const alertVisStatus = reactive({
  setting: false
})
// 系统设置表单
const settingForm = reactive({
  language: 'zh-cn',
  cacheMainPassword: true,
})
// 语言列表
const languages = reactive([
  {
    key: 'zh-cn',
    label: '简体中文',
  },
  {
    key: 'en-us',
    label: 'English',
  }
])

// 打开系统设置
const openSystemSetting = () => {
  settingForm.language = locale.value
  alertVisStatus.setting = true
}

// 保存设置
const saveSetting = () => {
  locale.value = settingForm.language
  alertVisStatus.setting = false
}

defineExpose({
  openSystemSetting
});
</script>

<template>
  <el-dialog
      v-model="alertVisStatus.setting"
      :title="t('systemSetting.title')"
      width="600px"
  >
    <el-form :model="settingForm" label-width="170px" :inline="true">
      <el-form-item :label="t('systemSetting.language')">
        <el-select v-model="settingForm.language">
          <el-option
              v-for="language in languages"
              :key="language.key"
              :label="language.label"
              :value="language.key"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('systemSetting.cacheMainPassword')">
        <el-switch v-model="settingForm.cacheMainPassword"></el-switch>
      </el-form-item>
    </el-form>

    <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="saveSetting">{{ t('systemSetting.save') }}</el-button>
          </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>