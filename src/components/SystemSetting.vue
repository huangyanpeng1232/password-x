<!--系统设置-->
<script setup>
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
import {loadConfig, updateConfig} from "@/utils/global.js";
import store from "@/store/index.js";
import {useDark} from '@vueuse/core'

const router = useRouter()

// 暗黑模式
const darkMode = useDark()

// 多语言
const {t, locale} = useI18n()

// 声明此组件可能调用的事件
const emit = defineEmits(['updateMainPassword', 'deleteAccount', 'systemChangeChange'])

// 注销账户组件对象
const deleteAccountRef = ref()

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
  sortRule: 'insertTimeDesc',
  showPasswordStrength: false,
  cacheDatabaseForm: true,
  showAddTime: true,
  showUpTime: false,
  verifyShowGesture: true,
  showLabel: true,
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

// 排序规则列表
const sorts = reactive([
  {key: 'insertTimeDesc', label: t('systemSetting.sort.insertTimeDesc')},
  {key: 'insertTimeAsc', label: t('systemSetting.sort.insertTimeAsc')},
  {key: 'name', label: t('systemSetting.sort.name')},
])

// 主题列表
const topics = reactive([
  {key: false, label: t('systemSetting.topic.light')},
  {key: true, label: t('systemSetting.topic.dark')}
])

// 是否缓存主密码列表
const cacheMains = reactive([
  {key: true, label: t('systemSetting.cacheMainPassword.enable')},
  {key: false, label: t('systemSetting.cacheMainPassword.disabled')}
])

// 显示添加时间列表
const showAddTimes = reactive([
  {key: true, label: t('systemSetting.showAddTime.enable')},
  {key: false, label: t('systemSetting.showAddTime.disabled')}
])

// 显示修改时间列表
const showUpTimes = reactive([
  {key: true, label: t('systemSetting.showUpTime.enable')},
  {key: false, label: t('systemSetting.showUpTime.disabled')}
])

// 显示标签列表
const showLabels = reactive([
  {key: true, label: t('systemSetting.showLabel.enable')},
  {key: false, label: t('systemSetting.showLabel.disabled')}
])

// 验证密码时显示手势
const verifyShowGestures = reactive([
  {key: true, label: t('mainPasswordSetting.verify.showGesture.enable')},
  {key: false, label: t('mainPasswordSetting.verify.showGesture.disabled')}
])

// 是否缓存登录信息列表
const cacheDatabaseForms = reactive([
  {key: true, label: t('systemSetting.cacheDatabaseForm.enable')},
  {key: false, label: t('systemSetting.cacheDatabaseForm.disabled')}
])

// 是否自动生成密码选项
const autoGeneratePasswords = reactive([
  {key: true, label: t('passwordForm.autoGeneratePassword.enable')},
  {key: false, label: t('passwordForm.autoGeneratePassword.disabled')}
])

// 密码强度提示
const showPasswordStrengths = reactive([
  {key: true, label: t('systemSetting.showPasswordStrength.enable')},
  {key: false, label: t('systemSetting.showPasswordStrength.disabled')}
])

let oldSystemSetting = null;

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
  if (settingForm.language !== locale.value) {
    settingForm.language = locale.value;
  }

  // 保存现有配置
  oldSystemSetting = JSON.stringify(settingForm)

  // 显示设置弹框
  alertVisStatus.setting = true
}

// 关闭设置
const closeSetting = () => {
  // 关闭设置
  alertVisStatus.setting = false;
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

  // 原有配置
  let oldSetting = JSON.parse(oldSystemSetting)

  // 若设置不缓存主密码则立即删除缓存中的主密码
  if (settingForm.cacheMainPassword !== oldSetting.cacheMainPassword && settingForm.cacheMainPassword === false) {
    localStorage.removeItem('mainPasswordCiphertext')
  }

  // 若设置不缓存登录信息则立即删除缓存中的登录信息
  if (settingForm.cacheDatabaseForm !== oldSetting.cacheDatabaseForm && settingForm.cacheDatabaseForm === false) {
    localStorage.removeItem('databaseForm')
  }

  // 设置系统语言
  if (settingForm.language !== locale.value) {
    locale.value = settingForm.language;
    console.log('系统语言设置为：', settingForm.language)
  }

  // 暗黑模式
  if (darkMode.value !== settingForm.darkMode) {
    darkMode.value = settingForm.darkMode
    console.log('暗黑模式设置为：', settingForm.darkMode)
  }

  // 排序规则改变
  if (settingForm.sortRule !== oldSetting.sortRule) {
    emit('systemChangeChange', 'sortChange', settingForm.sortRule)
    console.log('排序规则设置为：', settingForm.sortRule)
  }

  // 是否显示密码强度改变
  if (settingForm.showPasswordStrength !== oldSetting.showPasswordStrength) {
    emit('systemChangeChange', 'showPasswordStrength', settingForm.showPasswordStrength)
    console.log('是否显示密码强度设置为：', settingForm.showPasswordStrength)
  }

  // 关闭设置弹框
  alertVisStatus.setting = false;
}

// 退出登录
const logout = () => {
  // 删除database配置信息
  localStorage.removeItem('databaseForm')
  // 删除本地缓存的主密码
  localStorage.removeItem('mainPasswordCiphertext')
  // 删除database对象
  store.commit('delDatabase')
  // 删除database表单对象
  store.commit('delDatabaseForm')
  // 重定向到登录界面
  router.push('/login')
}

// 显示修改主密码弹框
const showUpdateMainPassword = () => {
  alertVisStatus.setting = false
  emit('updateMainPassword')
}

// 显示注销账号弹框
const showDeleteAccount = () => {
  alertVisStatus.setting = false
  deleteAccountRef.value.showDeleteAccount()
}

// 全屏
const fullscreen = ref(document.documentElement.clientWidth < 728)

window.addEventListener('resize', function () {
  fullscreen.value = document.documentElement.clientWidth < 728
});

// 导出的方法
defineExpose({
  logout,
  openSystemSetting,
  showUpdateMainPassword
});
</script>

<template>
  <el-dialog
      :fullscreen="fullscreen"
      v-model="alertVisStatus.setting"
      :title="t('systemSetting.title')"
      width="600px"
  >
    <el-form :model="settingForm" label-width="120px">
      <el-tabs tab-position="left" style="height: 350px">
        <el-tab-pane label="常规">
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
          <el-form-item :label="t('systemSetting.sort')">
            <el-select v-model="settingForm.sortRule">
              <el-option
                  v-for="sort in sorts"
                  :key="sort.key"
                  :label="sort.label"
                  :value="sort.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('passwordForm.autoGeneratePassword')">
            <el-select v-model="settingForm.autoGeneratePassword">
              <el-option
                  v-for="autoGenerate in autoGeneratePasswords"
                  :key="autoGenerate.key"
                  :label="autoGenerate.label"
                  :value="autoGenerate.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('systemSetting.defaultPasswordRule')">
            <el-row style="margin-top: 15px">
              <el-col :span="12">
                <el-checkbox size="small" v-model="settingForm.defaultPasswordRule.uppercase"
                             :label="t('passwordForm.generateForm.uppercase')" border/>
              </el-col>
              <el-col :span="12">
                <el-checkbox size="small" v-model="settingForm.defaultPasswordRule.lowercase"
                             :label="t('passwordForm.generateForm.lowercase')" border/>
              </el-col>
              <el-col :span="12">
                <el-checkbox size="small" v-model="settingForm.defaultPasswordRule.number"
                             :label="t('passwordForm.generateForm.number')" border/>
              </el-col>
              <el-col :span="12">
                <el-checkbox size="small" v-model="settingForm.defaultPasswordRule.symbol"
                             :label="t('passwordForm.generateForm.symbol')" border/>
              </el-col>
              <el-col :span="24">
                <div>
                  <el-input size="small" style="position: relative;top:3px"
                            v-model="settingForm.defaultPasswordRule.length">
                    <template #prepend>{{ t('passwordForm.generateForm.length') }}</template>
                  </el-input>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="个性化">
          <el-form-item :label="t('systemSetting.topic')">
            <el-select v-model="settingForm.darkMode">
              <el-option
                  v-for="topic in topics"
                  :key="topic.key"
                  :label="topic.label"
                  :value="topic.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('systemSetting.showPasswordStrength')">
            <el-select v-model="settingForm.showPasswordStrength">
              <el-option
                  v-for="showPasswordStrength in showPasswordStrengths"
                  :key="showPasswordStrength.key"
                  :label="showPasswordStrength.label"
                  :value="showPasswordStrength.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('systemSetting.showAddTime')">
            <el-select v-model="settingForm.showAddTime">
              <el-option
                  v-for="showAddTime in showAddTimes"
                  :key="showAddTime.key"
                  :label="showAddTime.label"
                  :value="showAddTime.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('systemSetting.showUpTime')">
            <el-select v-model="settingForm.showUpTime">
              <el-option
                  v-for="showUpTime in showUpTimes"
                  :key="showUpTime.key"
                  :label="showUpTime.label"
                  :value="showUpTime.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('systemSetting.showLabel')">
            <el-select v-model="settingForm.showLabel">
              <el-option
                  v-for="showLabel in showLabels"
                  :key="showLabel.key"
                  :label="showLabel.label"
                  :value="showLabel.key"
              />
            </el-select>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="安全">
          <el-form-item :label="t('systemSetting.cacheMainPassword')">
            <el-select v-model="settingForm.cacheMainPassword">
              <el-option
                  v-for="cacheMain in cacheMains"
                  :key="cacheMain.key"
                  :label="cacheMain.label"
                  :value="cacheMain.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('systemSetting.cacheDatabaseForm')">
            <el-select v-model="settingForm.cacheDatabaseForm">
              <el-option
                  v-for="cacheDatabase in cacheDatabaseForms"
                  :key="cacheDatabase.key"
                  :label="cacheDatabase.label"
                  :value="cacheDatabase.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('mainPasswordSetting.verify.showGesture')">
            <el-select v-model="settingForm.verifyShowGesture">
              <el-option
                  v-for="verifyShowGesture in verifyShowGestures"
                  :key="verifyShowGesture.key"
                  :label="verifyShowGesture.label"
                  :value="verifyShowGesture.key"
              />
            </el-select>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="其他">
          <div style="text-align: center">
            <el-button plain @click="showUpdateMainPassword">{{ t('systemSetting.updateMainPassword') }}</el-button>
            <el-button plain type="danger" @click="showDeleteAccount">{{ t('systemSetting.deleteAccount') }}</el-button>
            <el-button type="warning" plain @click="logout">{{ t('systemSetting.logout') }}</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <el-alert style="margin-top: 20px" type="warning">{{t('systemSetting.takeEffect')}}</el-alert>
    <template #footer>
          <span class="dialog-footer">
            <el-button plain @click="closeSetting">{{ t('systemSetting.close') }}</el-button>
            <el-button type="primary" plain @click="saveSetting">{{ t('systemSetting.save') }}</el-button>
          </span>
    </template>
  </el-dialog>

  <!--  注销账户-->
  <DeleteAccount ref="deleteAccountRef" @deleteAccount="logout"></DeleteAccount>
</template>

<style scoped>

</style>