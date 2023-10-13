<script setup>
import {useI18n} from "vue-i18n";
import {ElNotification} from "element-plus";
import {useRouter} from "vue-router";
import {loadConfig, updateConfig} from "@/utils/global.js";

const router = useRouter()

const {t, locale} = useI18n()

// 事件声明
const emit = defineEmits(['updateMainPassword', 'deleteAccount'])

// 弹框显示控制
const alertVisStatus = reactive({
  setting: false
})
// 系统设置表单
const settingForm = reactive({
  language: 'zh-cn',
  cacheMainPassword: true,
  autoGeneratePassword: true,
  defaultPasswordRule: {
    length: 16,
    number: true,
    lowercase: true,
    uppercase: true,
    symbol: true,
  }
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
  let config = loadConfig()
  if (config) {
    for (let key in config) {
      settingForm[key] = config[key]
    }
  }
  settingForm.language = locale.value;
  alertVisStatus.setting = true
}

// 保存设置
const saveSetting = () => {
  let generateForm = settingForm.defaultPasswordRule;
  if (!generateForm.number && !generateForm.symbol && !generateForm.lowercase && !generateForm.uppercase) {
    ElMessage.error('必须选择一种密码字符类型')
    return
  }

  updateConfig(settingForm)
  if (settingForm.cacheMainPassword === false) {
    localStorage.removeItem('mainPasswordCiphertext')
  }
  locale.value = settingForm.language;
  alertVisStatus.setting = false
}

// 退出登录
const logout = () => {
  localStorage.removeItem('ossForm')
  localStorage.removeItem('mainPasswordCiphertext')
  ElNotification.success(t('systemSetting.logout.success'));
  router.push('/login')
}

// 修改主密码
const updateMainPassword = () => {
  alertVisStatus.setting = false
  emit('updateMainPassword')
}

// 注销账号
const deleteAccount = () => {
  emit('deleteAccount')
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
    <el-form :model="settingForm" label-width="150px">
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
            <el-checkbox size="small" v-model="settingForm.defaultPasswordRule.uppercase"
                         :label="t('passwordForm.generateForm.uppercase')" border/>
          </el-col>
          <el-col :span="8">
            <el-checkbox size="small" v-model="settingForm.defaultPasswordRule.lowercase"
                         :label="t('passwordForm.generateForm.lowercase')" border/>
          </el-col>
          <el-col :span="8">
            <el-checkbox size="small" v-model="settingForm.defaultPasswordRule.number"
                         :label="t('passwordForm.generateForm.number')" border/>
          </el-col>
          <el-col :span="8">
            <el-checkbox size="small" v-model="settingForm.defaultPasswordRule.symbol"
                         :label="t('passwordForm.generateForm.symbol')" border/>
          </el-col>
          <el-col :span="8">
            <div>
              <el-input size="small" style="position: relative;top:3px"
                        v-model="settingForm.defaultPasswordRule.length">
                <template #prepend>{{ t('passwordForm.generateForm.length') }}</template>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button plain @click="updateMainPassword">{{ t('systemSetting.updateMainPassword') }}</el-button>
        <el-button type="danger" plain @click="deleteAccount">{{ t('systemSetting.deleteAccount') }}</el-button>
        <el-button type="warning" plain @click="logout">{{ t('systemSetting.logout') }}</el-button>
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