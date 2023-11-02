<!--系统设置-->
<script setup>
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
import {getEnv, loadConfig, updateConfig} from "@/utils/global.js";
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
const settingForm = reactive(loadConfig())

// 系统设置选项
const options = reactive({
  // 语言列表
  languages:[],
  // 排序规则列表
  sorts:[],
  // 主题列表
  topics:[],
  // 是否缓存主密码列表
  cacheMains:[],
  // 显示添加时间列表
  showAddTimes:[],
  // 显示修改时间列表
  showUpTimes:[],
  // 显示标签列表
  showLabels:[],
  // 启用标签
  enableLabels:[],
  // 验证密码时显示手势
  verifyShowGestures:[],
  // 是否缓存登录信息列表
  cacheDatabaseForms:[],
  // 是否自动生成密码选项
  autoGeneratePasswords:[],
  // 密码强度提示
  showPasswordStrengths:[],
})

const initOptions = () => {
  // 语言列表
  options.languages = [
    {key: 'zh-cn', label: '简体中文',},
    {key: 'en-us', label: 'English',}
  ]

  // 排序规则列表
  options.sorts = [
    {key: 'insertTimeDesc', label: t('systemSetting.sort.insertTimeDesc')},
    {key: 'insertTimeAsc', label: t('systemSetting.sort.insertTimeAsc')},
    {key: 'updateTimeDesc', label: t('systemSetting.sort.updateTimeDesc')},
    {key: 'updateTimeAsc', label: t('systemSetting.sort.updateTimeAsc')},
    {key: 'nameAsc', label: t('systemSetting.sort.nameAsc')},
    {key: 'nameDesc', label: t('systemSetting.sort.nameDesc')},
    {key: 'strengthDesc', label: t('systemSetting.sort.strengthAsc')},
    {key: 'strengthAsc', label: t('systemSetting.sort.strengthDesc')},
  ]

  // 主题列表
  options.topics = [
    {key: false, label: t('systemSetting.topic.light')},
    {key: true, label: t('systemSetting.topic.dark')}
  ]

  // 是否缓存主密码列表
  options.cacheMains = [
    {key: true, label: t('systemSetting.cacheMainPassword.enable')},
    {key: false, label: t('systemSetting.cacheMainPassword.disabled')}
  ]

  // 显示添加时间列表
  options.showAddTimes = [
    {key: true, label: t('systemSetting.showAddTime.enable')},
    {key: false, label: t('systemSetting.showAddTime.disabled')}
  ]

  // 显示修改时间列表
  options.showUpTimes = [
    {key: true, label: t('systemSetting.showUpTime.enable')},
    {key: false, label: t('systemSetting.showUpTime.disabled')}
  ]

  // 显示标签列表
  options.showLabels = [
    {key: true, label: t('systemSetting.showLabel.enable')},
    {key: false, label: t('systemSetting.showLabel.disabled')}
  ]

  // 启用标签
  options.enableLabels = [
    {key: true, label: t('systemSetting.enableLabel.enable')},
    {key: false, label: t('systemSetting.enableLabel.disabled')}
  ]

  // 验证密码时显示手势
  options.verifyShowGestures = [
    {key: true, label: t('mainPasswordSetting.verify.showGesture.enable')},
    {key: false, label: t('mainPasswordSetting.verify.showGesture.disabled')}
  ]

  // 是否缓存登录信息列表
  options.cacheDatabaseForms = [
    {key: true, label: t('systemSetting.cacheDatabaseForm.enable')},
    {key: false, label: t('systemSetting.cacheDatabaseForm.disabled')}
  ]

  // 是否自动生成密码选项
  options.autoGeneratePasswords = [
    {key: true, label: t('passwordForm.autoGeneratePassword.enable')},
    {key: false, label: t('passwordForm.autoGeneratePassword.disabled')}
  ]

  // 密码强度提示
  options.showPasswordStrengths = [
    {key: true, label: t('systemSetting.showPasswordStrength.enable')},
    {key: false, label: t('systemSetting.showPasswordStrength.disabled')}
  ]
}

let oldSystemSetting = null;

// 打开系统设置
const openSystemSetting = () => {

  // 初始化选项
  initOptions()

  // 读取系统配置
  let config = JSON.parse(JSON.stringify(loadConfig()))

  for (let key in config) {
    settingForm[key] = config[key]
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
  for (let i = 0; i < settingForm.userDefinedArray.length; i++) {
    if (settingForm.userDefinedArray[i].name === '') {
      settingForm.userDefinedArray[i].name = '自定义'
    }
  }

  // 更新系统配置
  updateConfig(settingForm)

  // 原有配置
  let oldSetting = JSON.parse(oldSystemSetting)

  // 若设置不缓存主密码则立即删除缓存中的主密码
  if (settingForm.cacheMainPassword !== oldSetting.cacheMainPassword && settingForm.cacheMainPassword === false) {
    localStorage.removeItem('mainPasswordCiphertext')
    console.log('删除主密码缓存')
  }

  // 若设置不缓存登录信息则立即删除缓存中的登录信息
  if (settingForm.cacheDatabaseForm !== oldSetting.cacheDatabaseForm && settingForm.cacheDatabaseForm === false) {
    localStorage.removeItem('databaseForm')
    console.log('删除自动登录信息')
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
  // 删除主密码验证码
  store.commit('delVerifyCode')
  // 重定向到登录界面
  router.push('/login')
}

// 显示修改主密码弹框
const showUpdateMainPassword = () => {
  alertVisStatus.setting = false
  emit('updateMainPassword')
}

// 添加自定义字段
const addUserDefined = () => {
  settingForm.userDefinedArray.push({
    id: Date.now(),
    name: '自定义'
  })
}

// 删除自定义字段
const delUserDefined = (id) => {
  console.log(settingForm.userDefinedArray, id)
  for (let i = 0; i < settingForm.userDefinedArray.length; i++) {
    if (settingForm.userDefinedArray[i].id === id) {
      settingForm.userDefinedArray.splice(i, 1)
      break
    }
  }
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
  showUpdateMainPassword,
  settingForm
});
</script>

<template>
  <el-dialog
      :fullscreen="fullscreen"
      v-model="alertVisStatus.setting"
      :title="t('systemSetting.title')"
      width="600px"
  >
    <el-form label-width="150px">
      <el-tabs tab-position="left" style="height: 350px">
        <el-tab-pane :label="t('systemSetting.type.general')">
          <el-form-item :label="t('systemSetting.language')">
            <el-select v-model="settingForm.language">
              <el-option
                  v-for="language in options.languages"
                  :key="language.key"
                  :label="language.label"
                  :value="language.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('systemSetting.sort')">
            <el-select v-model="settingForm.sortRule">
              <el-option
                  v-for="sort in options.sorts"
                  :key="sort.key"
                  :label="sort.label"
                  :value="sort.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('passwordForm.autoGeneratePassword')">
            <el-select v-model="settingForm.autoGeneratePassword">
              <el-option
                  v-for="autoGenerate in options.autoGeneratePasswords"
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
              <el-col :span="16">
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
        <el-tab-pane :label="t('systemSetting.type.personalization')">
          <el-form-item :label="t('systemSetting.topic')">
            <el-select v-model="settingForm.darkMode">
              <el-option
                  v-for="topic in options.topics"
                  :key="topic.key"
                  :label="topic.label"
                  :value="topic.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('systemSetting.showPasswordStrength')">
            <el-select v-model="settingForm.showPasswordStrength">
              <el-option
                  v-for="showPasswordStrength in options.showPasswordStrengths"
                  :key="showPasswordStrength.key"
                  :label="showPasswordStrength.label"
                  :value="showPasswordStrength.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('systemSetting.showAddTime')">
            <el-select v-model="settingForm.showAddTime">
              <el-option
                  v-for="showAddTime in options.showAddTimes"
                  :key="showAddTime.key"
                  :label="showAddTime.label"
                  :value="showAddTime.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('systemSetting.showUpTime')">
            <el-select v-model="settingForm.showUpTime">
              <el-option
                  v-for="showUpTime in options.showUpTimes"
                  :key="showUpTime.key"
                  :label="showUpTime.label"
                  :value="showUpTime.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('systemSetting.enableLabel')">
            <el-select v-model="settingForm.enableLabel">
              <el-option
                  v-for="enableLabel in options.enableLabels"
                  :key="enableLabel.key"
                  :label="enableLabel.label"
                  :value="enableLabel.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('systemSetting.showLabel')">
            <el-select :disabled="!settingForm.enableLabel" v-model="settingForm.showLabel">
              <el-option
                  v-for="showLabel in options.showLabels"
                  :key="showLabel.key"
                  :label="showLabel.label"
                  :value="showLabel.key"
              />
            </el-select>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane :label="t('systemSetting.type.security')">
          <el-form-item :label="t('systemSetting.cacheMainPassword')">
            <el-select v-model="settingForm.cacheMainPassword">
              <el-option
                  v-for="cacheMain in options.cacheMains"
                  :key="cacheMain.key"
                  :label="cacheMain.label"
                  :value="cacheMain.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('systemSetting.cacheDatabaseForm')">
            <el-select v-model="settingForm.cacheDatabaseForm">
              <el-option
                  v-for="cacheDatabase in options.cacheDatabaseForms"
                  :key="cacheDatabase.key"
                  :label="cacheDatabase.label"
                  :value="cacheDatabase.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('mainPasswordSetting.verify.showGesture')">
            <el-select v-model="settingForm.verifyShowGesture">
              <el-option
                  v-for="verifyShowGesture in options.verifyShowGestures"
                  :key="verifyShowGesture.key"
                  :label="verifyShowGesture.label"
                  :value="verifyShowGesture.key"
              />
            </el-select>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane :label="t('systemSetting.type.userDefined')">
          <el-alert>
            {{ t('systemSetting.type.userDefined.alert') }}
          </el-alert>
          <div style="text-align: right;margin-top: 15px;margin-bottom: 15px">
            <el-button size="small" type="primary" plain @click="addUserDefined">新增</el-button>
          </div>
          <el-form inline style="text-align: center">
            <el-form-item v-for="userDefined in settingForm.userDefinedArray">
              <el-row>
                <el-col :span="18">
                  <el-input v-model="userDefined.name"></el-input>
                </el-col>
                <el-col :span="6">
                  <el-button size="small" type="danger" @click="delUserDefined(userDefined.id)">删除</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :label="t('systemSetting.type.other')">
          <div style="text-align: center">
            <el-button plain @click="showUpdateMainPassword">{{ t('systemSetting.updateMainPassword') }}</el-button>
            <el-button plain type="danger" @click="showDeleteAccount">{{ t('systemSetting.deleteAccount') }}</el-button>
            <el-button type="warning" plain @click="logout">{{ t('systemSetting.logout') }}</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="t('systemSetting.about')" style="text-align: center">
          <el-descriptions
              :column="1"
              style="margin: 15px"
          >
            <el-descriptions-item>
              <template #label>
                {{t('systemSetting.about.version')}}:
              </template>
              {{getEnv('VITE_VERSION')}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                {{t('systemSetting.about.openSourceUrl')}}:
              </template>
              <el-link target="_blank" :href="getEnv('VITE_OPEN_SOURCE_URL')">{{getEnv('VITE_OPEN_SOURCE_URL')}}</el-link>
            </el-descriptions-item>
            <el-descriptions-item>
              {{t('systemSetting.about.submit')}}
            </el-descriptions-item>
          </el-descriptions>
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