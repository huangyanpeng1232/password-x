<!--密码首页-->
<script setup>
import {CopyDocument, Hide, Lock, Search, Setting, Unlock, View} from '@element-plus/icons-vue'
import {useI18n} from "vue-i18n";
import {copyText, isUrl, loadConfig} from "@/utils/global.js";
import {getFile, putFile} from "@/database/index.js";
import {decrypt, encrypt} from "@/utils/security.js";
import store from "@/store/index.js";
import {useDark} from '@vueuse/core'

const {t, locale} = useI18n()

// 暗黑模式
const darkMode = useDark()

// 密码表单组件对象
const passwordFormRef = ref()
// table对象
const tableRef = ref()
// 主密码验证组件对象
const mainPasswordVerifyRef = ref()
// 主密码初始化/设置组件对象
const mainPasswordSettingRef = ref()
// 系统设置组件对象
const systemSettingRef = ref()
// 导入导出组件对象
const importExportRef = ref()
// 标签组件对象
const labelTreeRef = ref()

// 系统配置
const systemConfig = reactive({})
// 搜索文本内容
const searchText = ref('')
// 主密码
const mainPassword = ref('')
// 主密码类型 普通：common、手势gesture
const mainPasswordType = ref('')
// 是否允许同步数据到database（若未成功同步database内容就更新database会造成密码丢失）
const passwordSyncStatus = ref(false)
// 密码列表未解密的密文
const passwordCiphertext = ref('')
// 全部的密码列表
const passwordArray = ref([])
// 页面显示的密码列表
const showPasswordArray = ref([])
// 选中的标签
const labelCheckNodes = ref([])
// 标签树数据
const labelTree = ref([])

// 搜索（根据搜索字符串显示符合条件的密码）
const loadShowPassword = async () => {
  // 搜索条件与标签选择为空，直接复制密码列表
  if (!searchText.value && !labelCheckNodes.value) {
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


    let searchVis = !searchText.value || (
        name.toUpperCase().includes(searchText.value.toUpperCase())
        || userName.toUpperCase().includes(searchText.value.toUpperCase())
        || address.toUpperCase().includes(searchText.value.toUpperCase())
        || remark.toUpperCase().includes(searchText.value.toUpperCase())
        || password.toUpperCase().includes(searchText.value.toUpperCase()))


    let labelCheckVis = false;

    if (labelCheckNodes.value.length > 0) {
      for (let j = 0; j < labelCheckNodes.value.length; j++) {
        let checkedNode = labelCheckNodes.value[j];

        if (passwordArray.value[i].label && passwordArray.value[i].label.includes(checkedNode.id)) {
          labelCheckVis = true
        }
      }
    } else {
      labelCheckVis = true
    }

    if (searchVis && labelCheckVis) {
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
  // 同步到database
  syncPasswordToDatabase()
  // 更新到显示列表
  loadShowPassword()
}

// 修改密码事件
const updatePassword = (password) => {
  for (let i = 0; i < passwordArray.value.length; i++) {
    if (passwordArray.value[i].id === password.id) {
      // 修改密码
      passwordArray.value[i] = password
      // 同步到database
      syncPasswordToDatabase()
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
  mainPasswordVerifyRef.value.verifyMainPassword()
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
      // 同步密码列表到database
      syncPasswordToDatabase()
      // 重新刷新搜索结果
      loadShowPassword()
      // 删除成功提示
      ElMessage.success(t('index.table.delete.success'))
      break
    }
  }
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
const mainPasswordChange = (password,passwordType) => {
  // 更新主密码
  mainPassword.value = password
  // 更新主密码类型
  mainPasswordType.value = passwordType
  // 同步到database
  syncPasswordToDatabase()
  // 提示变更成功
  ElMessage.success(t('index.mainPassword.changeSuccess'))
}

// 打开系统设置
const openSystemSetting = () => {
  systemSettingRef.value.openSystemSetting()
}

// 修改主密码
const showUpdateMainPassword = () => {
  mainPasswordSettingRef.value.updateMainPassword()
}

// 系统配置改变
const systemChangeChange = (key, value) => {
  systemConfig[key] = value
  if (key === 'sortChange') {
    passwordSort(value)
  }
}

// 排序规则改变
const passwordSort = (sort) => {

  if (sort === 'insertTimeDesc') {
    tableRef.value.sort('insertTime', 'descending')
    sortPasswordArray('insertTime', -1)
  } else if (sort === 'insertTimeAsc') {
    tableRef.value.sort('insertTime', 'ascending')
    sortPasswordArray('insertTime', 1)
  } else if (sort === 'updateTimeDesc') {
    tableRef.value.sort('updateTime', 'descending')
    sortPasswordArray('updateTime', -1)
  } else if (sort === 'updateTimeAsc') {
    tableRef.value.sort('updateTime', 'ascending')
    sortPasswordArray('updateTime', 1)
  } else if (sort === 'nameAsc') {
    tableRef.value.sort('name', 'ascending')
    sortPasswordArray('name', 1)
  } else if (sort === 'nameDesc') {
    tableRef.value.sort('name', 'descending')
    sortPasswordArray('name', -1)
  } else if (sort === 'strengthDesc') {
    tableRef.value.sort('strength', 'descending')
    sortPasswordArray('strength', -1)
  } else if (sort === 'strengthAsc') {
    tableRef.value.sort('strength', 'ascending')
    sortPasswordArray('strength', 1)
  }
  // 同步数据
  syncPasswordToDatabase()
}

// 获取密码强度
const getPasswordStrength = (password) => {
  let lvl = 0
  // 数字
  if (/[0-9]/.test(password)) {
    lvl++;
  }
  // 小写字母
  if (/[a-z]/.test(password)) {
    lvl++;
  }
  // 大写字母
  if (/[A-Z]/.test(password)) {
    lvl++;
  }
  // 特殊符号
  if (/[^0-9a-zA-Z_]/.test(password)) {
    lvl++;
  }

  // 长度小于6位
  if (password.length < 6) {
    if (lvl > 2) {
      lvl = 2;
    }
  }

  // 最高3分
  if (lvl > 3) {
    return 3
  } else {
    return lvl;
  }
}

// 安全等级排序
const strengthSort = (a, b) => {
  if (getPasswordStrength(a.password) > getPasswordStrength(b.password)) {
    return 1
  } else {
    return -1
  }
}

// 获取指定强度的密码数量
const getPasswordStrengthCount = (strength) => {
  let count = 0;
  for (let i = 0; i < passwordArray.value.length; i++) {
    if (!passwordArray.value[i].password) {
      continue
    }
    let passwordStreng = getPasswordStrength(passwordArray.value[i].password)
    if (strength === passwordStreng) {
      count++
    }
  }
  return count;
}

// 密码排序
const sortPasswordArray = (attr, rev) => {
  passwordArray.value.sort((a, b) => {
    if (attr === 'strength') {
      if (rev > 0) {
        return strengthSort(a, b);
      } else {
        return strengthSort(b, a);
      }
    }
    a = a[attr];
    b = b[attr];
    if (a < b) {
      return rev * -1
    }
    if (a > b) {
      return rev * 1
    }
    return 0;
  })
}

// 同步密码列表到database
const syncPasswordToDatabase = () => {
  if (!passwordSyncStatus.value) {
    // 不允许同步
    return
  }
  // 使用主密码加密密码列表
  passwordCiphertext.value = encrypt(mainPassword.value, JSON.stringify(passwordArray.value))
  // 使用主密码加密密码验证字符
  let verifyCode = encrypt(mainPassword.value, 'password-x')
  store.commit('setVerifyCode', verifyCode)
  // 上传文件
  putFile('password.json', {
    verifyValue: verifyCode,
    mainPasswordType: mainPasswordType.value,
    passwordCiphertext: passwordCiphertext.value
  })
}

// 从database加载密码文件
const loadPasswordByDatabase = () => {
  getFile('password.json').then(res => {
    if (res.verifyValue) {
      // 设置验证字符串
      let verifyCode = res.verifyValue;
      mainPasswordType.value = res.mainPasswordType || 'common';

      store.commit('setVerifyCode', verifyCode);
      store.commit('setMainPasswordType', mainPasswordType.value)

      // 密码列表密文
      passwordCiphertext.value = res.passwordCiphertext
      // 验证主密码（主密码验证通过后会将密文解密并更新到密码列表）
      mainPasswordVerifyRef.value.verifyMainPassword(true)
    } else {
      // 设置同步状态为可同步
      passwordSyncStatus.value = true
      // 验证字符串未空，第一次使用，初始化主密码
      mainPasswordSettingRef.value.settingMainPassword()
    }
  }).catch(e => {
    console.error(e)
    ElNotification.error('error-1000：' + e)
  })
}

// 标签选中
const labelCheckChange = (labelTreeCheckNodes) => {
  labelCheckNodes.value = labelTreeCheckNodes
  loadShowPassword()
}

// 标签数据变化
const labelTreeChange = (labelTreeData) => {
  labelTree.value = labelTreeData
}

// 根据标签id获取标签名
const getLabelNameById = (ids) => {
  if (!ids) {
    return ''
  }
  let result = []
  getLabelNameByIdRecursion(labelTree.value, ids, result);
  return result;
}

// 格式化时间
const getDateTime = (dateTime) => {
  if (dateTime && dateTime.length === 19) {
    return dateTime.substring(0, 16)
  }
  return dateTime
}

// 根据标签id获取标签名
const getLabelNameByIdRecursion = (array, ids, result) => {
  for (let i = 0; i < array.length; i++) {
    if (ids.includes(array[i].id)) {
      result.push(array[i].label)
    }
    if (array[i].children && array[i].children.length > 0) {
      getLabelNameByIdRecursion(array[i].children, ids, result)
    }
  }
}

// 下载excel模板
const downloadExcelTemplate = () => {
  importExportRef.value.downloadExcelTemplate()
}

// 导入excel
const importExcel = () => {
  importExportRef.value.importExcel(labelTree.value)
}

// 导出excel
const exportExcel = () => {
  importExportRef.value.exportExcel(passwordArray.value, labelTree.value)
}

// 导入密码事件
const importPasswordData = (dataArray, labelArray) => {
  if (dataArray.length === 0) {
    return
  }

  for (let i = dataArray.length - 1; i >= 0; i--) {
    passwordArray.value.unshift(dataArray[i]);
  }

  // 更新标签
  labelTreeRef.value.setLabelTree(labelArray)
  // 同步密码
  syncPasswordToDatabase()
  // 显示密码
  loadShowPassword()
}

// 退出登录
const logout = () => {
  systemSettingRef.value.logout()
}

// 是否暗黑模式
const isDark = () => {
  return darkMode.value
}

// 页面加载完成后事件
onMounted(() => {

  // 加载系统设置
  let config = loadConfig();
  for (let key in config) {
    systemConfig[key] = config[key]
  }

  // 设置系统语言
  if (systemConfig['language'] && systemConfig['language'] !== locale.value) {
    locale.value = systemConfig['language'];
  }

  // 从database加载密码文件
  loadPasswordByDatabase();
})
</script>

<template>
  <img alt="" class="back-img" src="~@/assets/images/backImg.svg">
  <el-row id="passwordBody">
    <el-col
        :xl="{span:systemConfig.enableLabel?16:20,offset:2}"
        :lg="{span:systemConfig.enableLabel?19:24}"
        :md="{span:systemConfig.enableLabel?19:24}">
      <el-card class="body-card" :style="{'background-color': isDark()?'rgba(0,0,0,0.4)':'rgba(255,255,255,0.4)'}">
        <template #header>
          <div style="display: flex;justify-content: space-between;">
            <div>
              <div class="hidden-xs-only">
                <el-text v-if="passwordArray" class="password-table-title">
                  {{ passwordArray.length }} {{ t('index.title.passwordCount') }}
                </el-text>
                <br>
                <div v-if="systemConfig.showPasswordStrength">
                  <el-text class="password-table-strength">{{ t('index.title.strength') }}（
                    <el-text type="success">{{ t('index.title.strength.strong') }}</el-text>
                    : {{ getPasswordStrengthCount(3) }}
                    <el-text style="margin-left: 5px" type="warning">{{ t('index.title.strength.medium') }}</el-text>
                    : {{ getPasswordStrengthCount(2) }}
                    <el-text style="margin-left: 5px" type="danger">{{ t('index.title.strength.weak') }}</el-text>
                    : {{ getPasswordStrengthCount(1) }}）
                  </el-text>
                </div>
              </div>
            </div>
            <div style="display: flex;justify-content: end" class="password-title-right">
              <div>
                <el-input
                    v-model="searchText"
                    style="max-width: 300px"
                    clearable
                    :placeholder="t('index.title.search')"
                    :prefix-icon="Search"
                    :disabled="!mainPassword"
                    @keyup.enter="loadShowPassword"
                />
              </div>
              <!--          添加密码-->
              <div>
                <el-button
                    :disabled="!mainPassword || !passwordSyncStatus"
                    type="primary"
                    plain
                    @click="showAddPassword()"
                >
                  {{ t('index.title.addPassword') }}
                </el-button>
              </div>
              <!--          解锁/锁定密码-->
              <div>
                <el-tooltip
                    v-if="!mainPassword"
                    :content="t('index.title.unlock')"
                    effect="dark"
                    placement="top"
                >
                  <el-button
                      :disabled="!passwordCiphertext"
                      :icon="Unlock"
                      @click="unlockMainPassword"
                  >
                  </el-button>
                </el-tooltip>
                <el-tooltip
                    v-if="mainPassword"
                    :content="t('index.title.lock')"
                    effect="dark"
                    placement="top"
                >
                  <el-button
                      :icon="Lock"
                      @click="lockMainPassword"
                  >
                  </el-button>
                </el-tooltip>
              </div>

              <!--          更多设置-->
              <el-dropdown>
                <el-button
                    :icon="Setting"
                ></el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="openSystemSetting">
                      {{ t('systemSetting.title') }}
                    </el-dropdown-item>
                    <el-dropdown-item divided @click="importExcel">
                      {{ t('index.title.importExport.import') }}
                    </el-dropdown-item>
                    <el-dropdown-item @click="exportExcel">
                      {{ t('index.title.importExport.export') }}
                    </el-dropdown-item>
                    <el-dropdown-item @click="downloadExcelTemplate">
                      {{ t('index.title.importExport.download') }}
                    </el-dropdown-item>
                    <el-dropdown-item divided @click="logout">
                      {{ t('index.title.logout') }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </template>
        <el-table
            height="calc(100vh - 130px)"
            style="background-color: rgba(0,0,0,0);"
            :header-row-style="{'background-color':'rgba(0,0,0,0)'}"
            :header-cell-style="{'background-color':'rgba(0,0,0,0)'}"
            :row-style="{'background-color':'rgba(0,0,0,0)'}"
            :cell-style="{'background-color':'rgba(0,0,0,0)'}"
            :data="showPasswordArray"
            ref="tableRef"
        >
          <template #empty>
            <!--              密码列表为空时展示-->
            <el-empty :description="mainPassword?t('index.table.empty'):t('index.table.lock')">
              <template v-if="!mainPassword" #image>
                <Lock />
              </template>
              <el-button @click="unlockMainPassword" plain type="primary">{{t('index.title.unlock')}}</el-button>
            </el-empty>
          </template>
          <el-table-column sortable :sort-method="strengthSort" v-if="systemConfig.showPasswordStrength" prop="strength"
                           width="30px">
            <template #default="scope">
              <el-tooltip v-if="getPasswordStrength(scope.row.password) === 3">
                <template #content>
                  {{ t('index.title.strength') + '：' + t('index.title.strength.strong') }}
                </template>
                <div class="password-strength"
                     style="background-color: #67C23A"
                ></div>
              </el-tooltip>
              <el-tooltip v-if="getPasswordStrength(scope.row.password) === 2">
                <template #content>
                  {{ t('index.title.strength') + '：' + t('index.title.strength.medium') }}
                </template>
                <div class="password-strength"
                     style="background-color: #E6A23C"
                ></div>
              </el-tooltip>
              <el-tooltip v-if="getPasswordStrength(scope.row.password) === 1">
                <template #content>
                  {{ t('index.title.strength') + '：' + t('index.title.strength.weak') }}
                </template>
                <div class="password-strength"
                     style="background-color: #F56C6C"
                ></div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column sortable :label="t('password.name')" min-width="130px" prop="name"></el-table-column>
          <el-table-column :label="t('password.address')" min-width="200px" prop="address">
            <template #default="scope">
              <el-link v-if="isUrl(scope.row.address)" :href="scope.row.address" target="_blank">
                {{ scope.row.address }}
              </el-link>
              <el-text v-else>
                {{ scope.row.address }}
              </el-text>
            </template>
          </el-table-column>
          <el-table-column :label="t('password.userName')" min-width="140px" prop="userName"></el-table-column>
          <el-table-column :label="t('password.password')" min-width="180px" prop="password">
            <template #default="scope">
              <div v-if="scope.row.password">
                  <span class="password-text">
                    <template v-if="!scope.row.show">•••••••••</template>
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
          <el-table-column v-if="systemConfig.enableLabel !== false && systemConfig.showLabel !== false"
                           :label="t('index.table.label')" min-width="130px"
                           prop="label">
            <template #default="scope">
              <el-tag style="margin: 3px" v-for="label in getLabelNameById(scope.row.label)" :key="label">
                {{label}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="t('password.remark')" min-width="130px" prop="remark"></el-table-column>
          <el-table-column sortable v-if="systemConfig.showAddTime" :label="t('password.insertTime')" width="145px"
                           prop="insertTime">
            <template #default="scope">
              {{ getDateTime(scope.row.insertTime) }}
            </template>

          </el-table-column>
          <el-table-column sortable v-if="systemConfig.showUpTime" :label="t('password.updateTime')" width="145px"
                           prop="updateTime">
            <template #default="scope">
              {{ getDateTime(scope.row.updateTime) }}
            </template>
          </el-table-column>
          <el-table-column width="135px" :label="t('index.table.operation')">
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
      </el-card>
    </el-col>
    <el-col v-if="systemConfig.enableLabel" :xl="{span:4}" :lg="{span:5}" :md="{span:5}" class="hidden-sm-and-down"
            style="padding-left: 15px">
      <LabelTree ref="labelTreeRef" @labelCheckChange="labelCheckChange" @labelTreeChange="labelTreeChange"></LabelTree>
    </el-col>

  </el-row>

  <!--  密码表单-->
  <PasswordForm ref="passwordFormRef" :labelTree="labelTree" @addPassword="addPassword"
                @updatePassword="updatePassword"></PasswordForm>

  <!--  验证主密码-->
  <MainPasswordVerify ref="mainPasswordVerifyRef" @verifyPass="mainPasswordLoadSucceed"></MainPasswordVerify>

  <!--  初始化/修改主密码-->
  <MainPasswordSetting ref="mainPasswordSettingRef" @mainPasswordChange="mainPasswordChange"></MainPasswordSetting>

  <!--  系统设置-->
  <SystemSetting
      ref="systemSettingRef"
      @updateMainPassword="showUpdateMainPassword"
      @systemChangeChange="systemChangeChange"
  ></SystemSetting>

  <!--  导入导出-->
  <ImportExport ref="importExportRef" :labelTree="labelTree" @importComplete="importPasswordData"></ImportExport>

</template>

<style scoped>
.body-card {
  backdrop-filter: blur(50px);
}

.back-img {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1
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

.password-table-strength {
  padding-left: 5px;
  font-size: 85%;
  color: #888;
  cursor: default;
}

.password-title-right > div {
  padding: 0 4px;
}

.password-strength {
  height: 13px;
  width: 13px;
  border-radius: 50%;
}
</style>