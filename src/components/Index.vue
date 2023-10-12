<script setup>
import {CopyDocument, Hide, Lock, Search, Setting, Unlock, View} from '@element-plus/icons-vue'
import {useI18n} from "vue-i18n";
import {copyText, isUrl} from "@/utils/global.js";
import PasswordForm from "@/components/PasswordForm.vue";

const {t} = useI18n()

// 搜索字符串
const searchText = ref('')
// 主密码
const mainPassword = ref('')
// 密码表单组件对象
const passwordFormRef = ref()
// 主密码验证组件对象
const mainPasswordVerifyRef = ref()
// 系统设置组件对象
const systemSettingRef = ref()
// 与oss的同步状态
const syncStatus = reactive({
  password: false
})

// 显示的密码列表
const showPasswordArray = ref([
  {
    name: '1111',
    address: 'http://wwww.kkk',
    userName: '12344',
    password: '12344',
    remark: '12344',
  }
])

// 密码字典
const passwordDist = reactive({
  uppercase: "ABCDEFGHJKLMNPQRSTUVWXYZ",
  lowercase: "abcdefghjkmnpqrstuvwxyz",
  number: "0123456789",
  symbol: "~!@#$^&*()_+.,;",
})

// 搜索
const searchPassword = async () => {

}

// 显示密码窗口
const addPassword = () => {
  passwordFormRef.value.addPassword()
}

// 显示修改密码窗口
const updatePassword = (password) => {
  passwordFormRef.value.updatePassword()
}

// 锁定密码
const lockMainPassword = () => {

}

// 解锁密码
const unlockMainPassword = () => {
  mainPasswordVerifyRef.value.verifyMainPassword('')
}

// 分享密码
const sharePassword = (password) => {
  let text = '名称：' + password.name + '\r\n'
  if (password.address) {
    text += '地址：' + password.address + '\r\n'
  }
  if (password.userName) {
    text += '用户名：' + password.userName + '\r\n'
  }
  if (password.password) {
    text += '密码：' + password.password + '\r\n'
  }
  if (password.remark) {
    text += password.remark + '\r\n'
  }
  text = text.substring(0, text.length - 2)
  copyText(text);
}

// 删除密码
const deletePassword = (password) => {

}

// 设置主密码
const setMainPassword = (password) => {
  mainPassword.value = password
}

// 主密码变更
const mainPasswordChange = (password) => {
  passwordFormRef.value.updatePassword(password);
}

// 系统设置
const openSystemSetting = () => {
  systemSettingRef.value.openSystemSetting()
}

const syncPassword = () => {
  syncStatus.password = true
}
syncPassword()
</script>

<template>
  <el-row id="passwordBody">
    <el-col :lg="{span:20,offset:2}" id="passwordList">
      <el-row style="padding: 10px 10px 0 10px;">
        <el-col :sm="{span:8}" class="hidden-xs-only" style="font-weight: bold;">
          <el-text style="padding-left: 5px;font-size: 105%;">{{ t('index.title.passwordCount') }}</el-text>
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
  <MainPasswordVerify ref="mainPasswordVerifyRef" @verifyPass="setMainPassword"></MainPasswordVerify>

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