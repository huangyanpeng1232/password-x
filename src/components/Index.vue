<!--密码首页-->
<script setup>
import {CopyDocument, Hide, Lock, Search, Setting, Unlock, View} from '@element-plus/icons-vue'
import {useI18n} from "vue-i18n";
import {copyText, getSystemConfig, isUrl} from "@/utils/global.js";
import {getFile, putFile} from "@/utils/oss.js";
import {ElMessage, ElNotification} from "element-plus";
import {decrypt, encrypt} from "@/utils/security.js";


const {t, locale} = useI18n()

// 密码表单组件对象
const passwordFormRef = ref()
// 主密码验证组件对象
const mainPasswordVerifyRef = ref()
// 主密码初始化/设置组件对象
const mainPasswordSettingRef = ref()
// 系统设置组件对象
const systemSettingRef = ref()
// 注销账户组件对象
const deleteAccountRef = ref()

// 搜索文本内容
const searchText = ref('')
// 主密码
const mainPassword = ref('')
// 是否允许同步数据到oss（若为成功同步oss内容就更新oss会造成密码丢失）
const passwordSyncStatus = ref(false)
// 密码列表未解密的密文
const passwordCiphertext = ref('')
// 主密码正确性验证参数
const verifyValue = ref('')
// 页面显示的密码列表
const showPasswordArray = ref([])
// 全部的密码列表
const passwordArray = ref([])

// 搜索（根据搜索字符串显示符合条件的密码）
const loadShowPassword = async () => {
  // 搜索条件为空，直接复制密码列表
  if (!searchText.value) {
    showPasswordArray.value = passwordArray.value
    return
  }

  // 搜索结果列表
  let array = [];
  for (let i = 0; i < passwordArray.value.length; i++) {
    let name = passwordArray.value[i].name || ''
    let userName = passwordArray.value[i].userName || ''
    let address = passwordArray.value[i].address || ''
    let remark = passwordArray.value[i].remark || ''
    let password = passwordArray.value[i].password || ''

    if (
        name.includes(searchText.value)
        || userName.includes(searchText.value)
        || address.includes(searchText.value)
        || remark.includes(searchText.value)
        || password.includes(searchText.value)
    ) {
      array.push(passwordArray.value[i]);
    }
  }
  showPasswordArray.value = array
}

// 显示添加密码窗口
const showAddPassword = () => {
  passwordFormRef.value.showAddPassword()
}

// 显示修改密码窗口
const showUpdatePassword = (password) => {
  passwordFormRef.value.showUpdatePassword(password)
}

// 新增密码事件
const addPassword = (password) => {
  // 新增在密码列表的第一位
  passwordArray.value.unshift(password)
  // 同步到oss
  syncPasswordToOSS()
  // 更新到显示列表
  loadShowPassword()
}

// 修改密码事件
const updatePassword = (password) => {
  for (let i = 0; i < passwordArray.value.length; i++) {
    if (passwordArray.value[i].id === password.id) {
      // 修改密码
      passwordArray.value[i] = password
      // 同步到oss
      syncPasswordToOSS()
      // 更新到显示列表
      loadShowPassword()
      break
    }
  }
}

// 锁定密码（删除主密码以及密码列表但保留未解密的密码字符串）
const lockMainPassword = () => {
  // 更新加密后的密码字符串
  passwordCiphertext.value = encrypt(mainPassword.value, JSON.stringify(passwordArray.value))
  // 设置同步状态为不可同步
  passwordSyncStatus.value = false
  // 清空展示的密码列表
  showPasswordArray.value = []
  // 清空全部的密码列表
  passwordArray.value = []
  // 清空主密码
  mainPassword.value = ''
  // 删除本地缓存的主密码
  mainPasswordVerifyRef.value.delLocalMainPassword()
}

// 解锁密码（通过输入主密码解密密码字符串并显示到密码列表）
const unlockMainPassword = () => {
  mainPasswordVerifyRef.value.verifyMainPassword(verifyValue.value)
}

// 分享密码（按照一定格式将密码拼接并复制到剪切板）
const sharePassword = (password) => {
  let text = t('password.name') + ': ' + password.name + '\r\n'
  if (password.address) {
    text += t('password.address') + ': ' + password.address + '\r\n'
  }
  if (password.userName) {
    text += t('password.userName') + ': ' + password.userName + '\r\n'
  }
  if (password.password) {
    text += t('password.password') + ': ' + password.password + '\r\n'
  }
  if (password.remark) {
    text += password.remark + '\r\n'
  }
  text = text.substring(0, text.length - 2)
  // 复制到剪切板
  copyText(text);
}

// 删除密码
const deletePassword = (password) => {
  for (let i = 0; i < passwordArray.value.length; i++) {
    if (passwordArray.value[i].id === password.id) {
      passwordArray.value.splice(i, 1)
      break
    }
  }

  // 同步密码列表到oss
  syncPasswordToOSS()
  // 重新刷新搜索结果
  loadShowPassword()
  // 删除成功提示
  ElMessage.success(t('index.table.delete.success'))
}

// 主密码加载成功事件
const mainPasswordLoadSucceed = (password) => {
  // 设置主密码
  mainPassword.value = password
  // 根据主密码解密密文
  let passwordListText = decrypt(password, passwordCiphertext.value)
  // 设置密码列表
  passwordArray.value = JSON.parse(passwordListText)
  // 设置同步状态为可同步
  passwordSyncStatus.value = true
  // 显示密码列表
  loadShowPassword()
}

// 主密码变更
const mainPasswordChange = (password) => {
  // 更新主密码
  mainPassword.value = password
  // 同步到oss
  syncPasswordToOSS()
  // 提示变更成功
  ElMessage.success(t('index.mainPassword.changeSuccess'))
}

// 打开系统设置
const openSystemSetting = () => {
  systemSettingRef.value.openSystemSetting()
}

// 修改主密码
const showUpdateMainPassword = () => {
  mainPasswordSettingRef.value.showUpdateMainPassword(verifyValue.value)
}

// 同步密码列表到oss
const syncPasswordToOSS = () => {
  if (!passwordSyncStatus.value) {
    // 不允许同步
    return
  }
  // 使用主密码加密密码列表
  passwordCiphertext.value = encrypt(mainPassword.value, JSON.stringify(passwordArray.value))
  // 使用主密码加密密码验证字符
  verifyValue.value = encrypt(mainPassword.value, 'password-x')
  // 上传文件
  putFile('password.json', {
    verifyValue: verifyValue.value,
    passwordCiphertext: passwordCiphertext.value
  })
}

// 从oss加载密码文件
const loadPasswordByOSS = () => {
  getFile('password.json').then(res => {
    if (res.verifyValue) {
      // 设置验证字符串
      verifyValue.value = res.verifyValue;
      // 密码列表密文
      passwordCiphertext.value = res.passwordCiphertext
      // 验证主密码（主密码验证通过后会将密文解密并更新到密码列表）
      mainPasswordVerifyRef.value.verifyMainPassword(verifyValue.value)
    } else {
      // 设置同步状态为可同步
      passwordSyncStatus.value = true
      // 验证字符串未空，第一次使用，初始化主密码
      mainPasswordSettingRef.value.initMainPassword()
    }
  }).catch(e => {
    ElNotification.error(e.code)
    console.log(e)
  })
}

// 注销账户事件
const affirmDeleteAccount = () => {
  // 清除加密的密码列表
  passwordCiphertext.value = null
  // 设置同步状态为不可同步
  passwordSyncStatus.value = false
  // 提示注销成功
  ElNotification.success(t('systemSetting.deleteAccount.success'));
  // 退出登录
  systemSettingRef.value.logout()
}

// 注销账户
const showDeleteAccount = () => {
  deleteAccountRef.value.showDeleteAccount(verifyValue.value)
}

// 页面加载完成后事件
onMounted(() => {

  // 设置系统语言
  let language = getSystemConfig('language')
  if (language) {
    locale.value = language
  }

  // 从oss加载密码文件
  loadPasswordByOSS();
})
</script>

<template>
  <el-row id="passwordBody">
    <el-col :lg="{span:20,offset:2}" id="passwordList">
      <el-row style="padding: 10px 10px 0 10px;">
        <el-col :sm="{span:8}" class="hidden-xs-only" style="font-weight: bold;">
          <el-text v-if="passwordArray" class="password-table-title">
            {{ passwordArray.length }} {{ t('index.title.passwordCount') }}
          </el-text>
        </el-col>
        <el-col :sm="{span:16}" :xs="{span:24}" style="text-align: right">
          <el-input
              v-model="searchText"
              style="width: 50%;max-width: 300px"
              :placeholder="t('index.title.search')"
              :prefix-icon="Search"
              :disabled="!mainPassword"
              @keyup.enter="loadShowPassword"
          />
          <!--          添加密码-->
          <el-button
              :disabled="!mainPassword || !passwordSyncStatus"
              @click="showAddPassword()"
              style="margin-left: 15px">
            {{ t('index.title.addPassword') }}
          </el-button>
          <!--          解锁密码-->
          <el-tooltip
              :content="t('index.title.unlock')"
              effect="dark"
              placement="top"
          >
            <el-button
                v-if="!mainPassword"
                :disabled="!passwordCiphertext"
                :icon="Unlock"
                @click="unlockMainPassword"
            >
            </el-button>
          </el-tooltip>
          <!--          锁定密码-->
          <el-tooltip
              :content="t('index.title.lock')"
              effect="dark"
              placement="top"
          >
            <el-button
                v-if="mainPassword"
                :icon="Lock"
                @click="lockMainPassword"
            >
            </el-button>
          </el-tooltip>
          <!--          系统设置-->
          <el-tooltip
              :content="t('index.title.setting')"
              effect="dark"
              placement="top"
          >
            <el-button
                :icon="Setting"
                @click="openSystemSetting"
            ></el-button>
          </el-tooltip>
        </el-col>
      </el-row>
      <el-divider style="margin-bottom: 5px;"></el-divider>
      <el-row>
        <el-col style="padding: 15px">
          <el-table height="calc(100vh - 150px)" :data="showPasswordArray">
            <template #empty>
              <!--              密码列表为空时展示-->
              {{ t('index.table.empty') }}
            </template>
            <el-table-column :label="t('password.name')" prop="name"></el-table-column>
            <el-table-column :label="t('password.address')" prop="address">
              <template #default="scope">
                <el-link v-if="isUrl(scope.row.address)" :href="scope.row.address" target="_blank">
                  {{ scope.row.address }}
                </el-link>
                <el-text v-else>
                  {{ scope.row.address }}
                </el-text>
              </template>
            </el-table-column>
            <el-table-column width="200px" :label="t('password.userName')" prop="userName"></el-table-column>
            <el-table-column width="250px" :label="t('password.password')">
              <template #default="scope">
                <div v-if="scope.row.password">
                  <span class="password-text">
                    <template v-if="!scope.row.show">••••••••••</template>
                    <template v-if="scope.row.show">{{ scope.row.password }}</template>
                  </span>
                  <div class="pass-action-div">
                    <!-- 显示/隐藏密码-->
                    <View v-if="!scope.row.show" @click="scope.row.show = !scope.row.show"></View>
                    <Hide v-if="scope.row.show" @click="scope.row.show = !scope.row.show"></Hide>
                    <!-- 复制密码-->
                    <CopyDocument @click="copyText(scope.row.password)"></CopyDocument>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="t('password.remark')" width="200px" prop="remark"></el-table-column>
            <el-table-column :label="t('index.table.operation')" width="150px">
              <template #default="scope">
                <!--                分享-->
                <el-link type="success" :underline="false" @click="sharePassword(scope.row)">
                  {{ t('index.table.share') }}
                </el-link>
                <!--                编辑-->
                <el-link :underline="false" style="margin-left: 10px" type="primary"
                         @click="showUpdatePassword(scope.row)">
                  {{ t('index.table.edit') }}
                </el-link>
                <!--                删除-->
                <el-popconfirm
                    :title="t('index.table.operation.affirmDelete')"
                    :confirm-button-text="t('index.table.operation.affirm')"
                    :cancel-button-text="t('index.table.operation.cancel')"
                    @confirm="deletePassword(scope.row)">
                  <template #reference>
                    <el-link style="margin-left: 10px" :underline="false" type="danger">
                      {{ t('index.table.operation.delete') }}
                    </el-link>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-col>
  </el-row>

  <!--  密码表单-->
  <PasswordForm ref="passwordFormRef" @addPassword="addPassword" @updatePassword="updatePassword"></PasswordForm>

  <!--  验证主密码-->
  <MainPasswordVerify ref="mainPasswordVerifyRef" @verifyPass="mainPasswordLoadSucceed"></MainPasswordVerify>

  <!--  初始化/修改主密码-->
  <MainPasswordSetting ref="mainPasswordSettingRef" @mainPasswordChange="mainPasswordChange"></MainPasswordSetting>

  <!--  系统设置-->
  <SystemSetting ref="systemSettingRef" @deleteAccount="showDeleteAccount"
                 @updateMainPassword="showUpdateMainPassword"></SystemSetting>

  <!--  注销账户-->
  <DeleteAccount ref="deleteAccountRef" @affirmDeleteAccount="affirmDeleteAccount"></DeleteAccount>
</template>

<style scoped>
@media screen and (min-width: 728px) {
  #passwordBody {
    padding: 15px;
  }

  #passwordList {
    border-radius: 5px;
  }
}

#passwordList {
  background-color: white;
  padding-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.13), 0 0 3px rgba(0, 0, 0, 0.11);
}

.pass-action-div {
  float: right;
  margin-top: 2px;
}

.pass-action-div svg {
  width: 18px;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  margin-left: 3px;
}

.pass-action-div svg:hover {
  background-color: rgba(200, 200, 200, 0.3);
}

.password-text {
  line-height: 30px;
}

.password-table-title {
  padding-left: 5px;
  font-size: 105%;
  cursor: default;
}
</style>