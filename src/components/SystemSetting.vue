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
  autoGeneratePassword: true,
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
// 语言列表
const defaultPasswordRule = reactive({
  length: 16,
  number: true,
  lowercase: true,
  uppercase: true,
  symbol: true,
})

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
    <el-form :model="settingForm" label-width="200px">
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
      <el-form-item :label="t('passwordForm.autoGeneratePassword')">
        <el-switch v-model="settingForm.autoGeneratePassword" clearable/>
      </el-form-item>
      <el-form-item :label="t('systemSetting.defaultPasswordRule')">
        <el-row style="margin-top: 15px">
          <el-col :span="8">
            <el-checkbox size="small" v-model="defaultPasswordRule.uppercase"
                         :label="t('passwordForm.generateForm.uppercase')" border/>
          </el-col>
          <el-col :span="8">
            <el-checkbox size="small" v-model="defaultPasswordRule.lowercase"
                         :label="t('passwordForm.generateForm.lowercase')" border/>
          </el-col>
          <el-col :span="8">
            <el-checkbox size="small" v-model="defaultPasswordRule.number"
                         :label="t('passwordForm.generateForm.number')" border/>
          </el-col>
          <el-col :span="8">
            <el-checkbox size="small" v-model="defaultPasswordRule.symbol"
                         :label="t('passwordForm.generateForm.symbol')" border/>
          </el-col>
          <el-col :span="8">
            <div>
              <el-input size="small" style="position: relative;top:3px" v-model="defaultPasswordRule.length">
                <template #prepend>{{ t('passwordForm.generateForm.length') }}</template>
              </el-input>
            </div>

          </el-col>
        </el-row>
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