<script setup>
import {CopyDocument, Hide, Lock, Search, Setting, Unlock, View} from '@element-plus/icons-vue'
import {useI18n} from "vue-i18n";
import {copyText, isUrl} from "@/utils/global.js";
import {getFile, putFile} from "@/utils/oss.js";
import PasswordForm from "@/components/PasswordForm.vue";
import {ElMessage, ElNotification} from "element-plus";
import {decrypt, encrypt} from "@/utils/security.js";

const {t} = useI18n()

// 密码表单组件对象
const passwordFormRef = ref()
// 主密码验证组件对象
const mainPasswordVerifyRef = ref()
// 主密码设置组件对象
const mainPasswordSettingRef = ref()
// 系统设置组件对象
const systemSettingRef = ref()

// 搜索字符串
const searchText = ref('')
// 主密码
const mainPassword = ref('')
// 是否允许同步数据到oss
const syncStatus = reactive({
  password: false
})
// 密码列表解密后的密文
const passwordCiphertext = ref('')
// 密码正确性验证参数
const verifyValue = ref('')
// 显示的密码列表
const showPasswordArray = ref([])
// 密码列表
const passwordArray = ref([])

// 搜索
const loadShowPassword = async () => {
  // 搜索条件为空，直接复制
  if (searchText.value === '') {
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

    if (
        name.indexOf(searchText.value) !== -1
        || userName.indexOf(searchText.value) !== -1
        || address.indexOf(searchText.value) !== -1
        || remark.indexOf(searchText.value) !== -1
    ) {
      array.push(passwordArray.value[i]);
    }
  }
  showPasswordArray.value = array
}

// 显示密码窗口
const addPassword = () => {
  passwordFormRef.value.addPassword()
}

// 显示修改密码窗口
const updatePassword = (password) => {
  passwordFormRef.value.updatePassword(password)
}

// 锁定密码
const lockMainPassword = () => {
  // 同步状态改为未同步
  syncStatus.password = false
  // 清空搜索列表
  showPasswordArray.value = []
  // 清空密码列表
  passwordArray.value = []
  // 清空当前主密码
  mainPassword.value = ''
  // 删除本地缓存的主密码
  mainPasswordVerifyRef.value.delLocalMainPassword()
}

// 解锁密码
const unlockMainPassword = () => {
  mainPasswordVerifyRef.value.verifyMainPassword(verifyValue.value)
}

// 分享密码
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
  // 同步密码到oss
  syncPasswordToOSS()
  // 重新刷新搜索结果
  loadShowPassword()

  ElMessage.success(t('index.table.delete.success'))
}

// 主密码加载成功
const mainPasswordLoadSucceed = (password) => {
  let passwordListText = decrypt(password, passwordCiphertext.value)
  passwordArray.value = JSON.parse(passwordListText)
  syncStatus.password = true
  loadShowPassword()
}

// 主密码变更
const mainPasswordChange = (password) => {
  passwordFormRef.value.updatePassword(password);
}

// 系统设置
const openSystemSetting = () => {
  systemSettingRef.value.openSystemSetting()
}

// 上传到oss
const syncPasswordToOSS = () => {
  let passwordCiphertext = encrypt(mainPassword.value, JSON.stringify(passwordArray))
  passwordCiphertext.value = passwordCiphertext

  let body = {
    verifyValue: encrypt(mainPassword, 'password-x'),
    passwordCiphertext: passwordCiphertext
  }
  putFile('password.json', body).then(res => {
    console.log('文件同步成功', res.code)
  }).catch(err => {
    console.error(err)
  })
}

// 从oss获取密码文件
const getPasswordByOSS = () => {
  getFile('password.json').then(res => {
    verifyValue.value = res.verifyValue
    passwordCiphertext.value = res.passwordCiphertext
    mainPasswordVerifyRef.value.verifyMainPassword(verifyValue.value)
  }).catch(e => {
    // 404是没找到文件，可能是第一次使用属于正常情况
    if (e.status === 404) {
      // 初始化主密码
      mainPasswordSettingRef.value.initMainPassword()
    } else {
      ElNotification.error(e.code)
      console.error(e)
    }
  })
}

getPasswordByOSS()
</script>

<template>
  <el-row id="passwordBody">
    <el-col :lg="{span:20,offset:2}" id="passwordList">
      <el-row style="padding: 10px 10px 0 10px;">
        <el-col :sm="{span:8}" class="hidden-xs-only" style="font-weight: bold;">
          <el-text style="padding-left: 5px;font-size: 105%;">{{passwordArray.value.length}}{{ t('index.title.passwordCount') }}</el-text>
        </el-col>
        <el-col :sm="{span:16}" :xs="{span:24}" style="text-align: right">
          <el-input
              v-model="searchText"
              style="width: 50%;max-width: 300px"
              :placeholder="t('index.title.search')"
              :prefix-icon="Search"
              :disabled="!mainPassword"
              @keyup.enter="searchPassword"
          />
          <el-button
              :disabled="!mainPassword || !syncStatus.password"
              @click="addPassword()"
              style="margin-left: 15px">
            {{ t('index.title.addPassword') }}
          </el-button>
          <el-button v-if="!mainPassword" @click="unlockMainPassword" :icon="Unlock"></el-button>
          <el-button v-if="mainPassword" @click="lockMainPassword" :icon="Lock"></el-button>
          <el-button @click="openSystemSetting" :icon="Setting"></el-button>

        </el-col>
      </el-row>
      <el-divider style="margin-bottom: 5px;"></el-divider>
      <el-row>
        <el-col style="padding: 15px">
          <el-table height="calc(100vh - 150px)" :data="showPasswordArray">
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
                    <View v-if="!scope.row.show" @click="scope.row.show = !scope.row.show"></View>
                    <Hide v-if="scope.row.show" @click="scope.row.show = !scope.row.show"></Hide>
                    <CopyDocument @click="copyText(scope.row.password)"></CopyDocument>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="t('password.remark')" width="200px" prop="remark"></el-table-column>
            <el-table-column :label="t('index.table.operation')" width="150px">
              <template #default="scope">
                <el-link type="success" :underline="false" @click="sharePassword(scope.row)">
                  {{ t('index.table.share') }}
                </el-link>
                <el-link style="margin-left: 10px" :underline="false" type="primary" @click="updatePassword(scope.row)">
                  {{ t('index.table.edit') }}
                </el-link>
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
  <PasswordForm ref="passwordFormRef"></PasswordForm>

  <!--  验证主密码-->
  <MainPasswordVerify ref="mainPasswordVerifyRef" @verifyPass="mainPasswordLoadSucceed"></MainPasswordVerify>

  <!--  初始化/修改主密码-->
  <MainPasswordSetting ref="mainPasswordSettingRef" @mainPasswordChange="mainPasswordChange"></MainPasswordSetting>

  <!--  系统设置-->
  <SystemSetting ref="systemSettingRef"></SystemSetting>
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
</style>