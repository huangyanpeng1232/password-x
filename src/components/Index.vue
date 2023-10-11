<script setup>
import {CopyDocument, Hide, Lock, Search, Unlock, View} from '@element-plus/icons-vue'

import {copyText, isUrl} from "@/utils/global.js";

// 搜索字符串
const searchText = ref('')
// 主密码
const mainPassword = ref('')
// 同步状态
const syncStatus = reactive({
  password: false
})
// 弹框显示控制
const alertVisStatus = reactive({
  password: false
})
// 密码表单
const passwordForm = reactive({
  id: '',
  name: '',
  address: '',
  userName: '',
  password: '',
  remark: ''
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

// 搜索
const searchPassword = async () => {

}

// 显示密码窗口
const addPassword = () => {

  alertVisStatus.password = true
}

// 显示修改密码窗口
const updatePassword = () => {

  alertVisStatus.password = true
}

// 解锁密码
const lockMainPassword = () => {

}

// 锁定密码
const unlockMainPassword = () => {

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
</script>

<template>
  <el-row id="passwordBody">
    <el-col :lg="{span:20,offset:2}" id="passwordList">
      <el-row style="padding: 10px 10px 0 10px;">
        <el-col :sm="{span:8}" class="hidden-xs-only" style="font-weight: bold;">
          <el-text style="padding-left: 5px;font-size: 105%;">1个保存的密码。</el-text>
        </el-col>
        <el-col :sm="{span:16}" :xs="{span:24}" style="text-align: right">
          <el-input
              v-model="searchText"
              style="width: 50%;max-width: 300px"
              placeholder="搜索..."
              :prefix-icon="Search"
              :disabled="!mainPassword"
              @keyup.enter="searchPassword"
          />
          <el-button
              :disabled="!mainPassword || !syncStatus.password"
              @click="addPassword()"
              style="margin-left: 15px">
            添加密码
          </el-button>
          <el-button v-if="!mainPassword" @click="unlockMainPassword()" :icon="Unlock"></el-button>
          <el-button v-if="mainPassword" @click="lockMainPassword()" :icon="Lock"></el-button>
        </el-col>
      </el-row>
      <el-divider style="margin-bottom: 5px;"></el-divider>
      <el-row>
        <el-col style="padding: 15px">
          <el-table height="calc(100vh - 150px)" :data="showPasswordArray">
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="地址" prop="address">
              <template #default="scope">
                <el-link v-if="isUrl(scope.row.address)" :href="scope.row.address" target="_blank">
                  {{ scope.row.address }}
                </el-link>
                <el-text v-else>
                  {{ scope.row.address }}
                </el-text>
              </template>
            </el-table-column>
            <el-table-column width="200px" label="用户名" prop="userName"></el-table-column>
            <el-table-column width="250px" label="密码">
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
            <el-table-column label="备注" width="200px" prop="remark"></el-table-column>
            <el-table-column label="操作" width="150px">
              <template #default="scope">
                <el-link type="success" :underline="false" @click="sharePassword(scope.row)">分享</el-link>
                <el-link style="margin-left: 10px" :underline="false" type="primary" @click="updatePassword(scope.row)">
                  修改
                </el-link>
                <el-popconfirm
                    title="确认删除吗?"
                    confirm-button-text="删除"
                    cancel-button-text="取消"
                    @confirm="deletePassword(scope.row)">
                  <template #reference>
                    <el-link style="margin-left: 10px" :underline="false" type="danger">删除</el-link>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-col>
  </el-row>


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