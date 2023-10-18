<!--系统设置-->
<script setup>
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
import {loadConfig, updateConfig} from "@/utils/global.js";
import {decrypt, getBowerId} from '@/utils/security.js'
import store from "@/store/index.js";

import {useDark} from '@vueuse/core'

const darkMode = useDark()

const router = useRouter()

const {t, locale} = useI18n()

// 声明此组件可能调用的事件
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
  darkMode: false,
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
  {key: 'zh-cn', label: '简体中文',},
  {key: 'en-us', label: 'English',}
])

// 打开系统设置
const openSystemSetting = () => {
  // 读取系统配置
  let config = loadConfig()
  if (config) {
    for (let key in config) {
      settingForm[key] = config[key]
    }
  }
  // 设置界面语言
  settingForm.language = locale.value;
  // 显示设置弹框
  alertVisStatus.setting = true
}

// 保存设置
const saveSetting = () => {
  let generateForm = settingForm.defaultPasswordRule;
  // 密码规则校验
  if (!generateForm.number && !generateForm.symbol && !generateForm.lowercase && !generateForm.uppercase) {
    ElMessage.error(t('systemSetting.passwordRuleVerify'))
    return
  }

  // 更新系统配置
  updateConfig(settingForm)
  // 若设置不缓存主密码则立即删除缓存中的主密码
  if (settingForm.cacheMainPassword === false) {
    localStorage.removeItem('mainPasswordCiphertext')
  }
  // 设置系统语言
  locale.value = settingForm.language;
  // 暗黑模式
  darkMode.value = settingForm.darkMode
  // 关闭密码弹框
  alertVisStatus.setting = false
}

// 退出登录
const logout = () => {
  // 删除oss配置信息
  localStorage.removeItem('ossForm')
  // 删除本地缓存的主密码
  localStorage.removeItem('mainPasswordCiphertext')
  // 删除oss对象
  store.commit('delOss')
  // 重定向到登录界面
  router.push('/login')
}

// 显示修改主密码弹框
const showUpdateMainPassword = () => {

  // 获取缓存配置
  let ciphertext = localStorage.getItem('ossForm')
  let ossFormContent = decrypt(getBowerId(), ciphertext);
  let ossForm = JSON.parse(ossFormContent);

  if (ossForm.accessKeyId === import.meta.env.VITE_DEMO_ACCESS_KEY_ID) {
    ElMessage.error('演示账号不能修改主密码')
    return
  }
  alertVisStatus.setting = false
  emit('updateMainPassword')
}

// 显示注销账号弹框
const showDeleteAccount = () => {
  alertVisStatus.setting = false
  emit('deleteAccount')
}

// 导出的方法
defineExpose({
  openSystemSetting,
  showUpdateMainPassword,
  logout
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
      <el-form-item :label="t('systemSetting.darkMode')">
        <el-switch v-model="settingForm.darkMode"/>
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
        <el-button plain @click="showUpdateMainPassword">{{ t('systemSetting.updateMainPassword') }}</el-button>
        <el-button plain type="danger" @click="showDeleteAccount">{{ t('systemSetting.deleteAccount') }}</el-button>
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