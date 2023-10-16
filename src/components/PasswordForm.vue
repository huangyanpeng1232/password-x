<!--密码表单-->
<script setup>
import {useI18n} from "vue-i18n";

import {copyText, getSystemConfig, randomText} from "@/utils/global.js";
import moment from "moment";

defineProps({
  groupTree: Array,
})

// 声明此组件可能调用的事件
const emit = defineEmits(['addPassword', 'updatePassword'])

const {t} = useI18n()

// 密码表单对象
const passwordFormRef = ref()
// 弹框显示控制
const alertVisStatus = reactive({
  password: false
})
// 密码弹框模式（新增/修改）
const passwordAlertMode = ref('')

// 密码字典
const passwordDist = reactive({
  uppercase: "ABCDEFGHJKLMNPQRSTUVWXYZ",
  lowercase: "abcdefghjkmnpqrstuvwxyz",
  number: "0123456789",
  symbol: "~!@#$^&*()_+.,;",
})

// 默认密码表单
const defaultPassword = () => {
  return {
    id: 0,
    name: '',
    address: '',
    userName: '',
    password: '',
    remark: '',
    group: '',
    insertTime: '',
    updateTime: ''
  }
}

// 密码表单
const passwordForm = reactive(defaultPassword())

// 密码生成规则表单
const generateForm = reactive({
  length: 16,// 密码长度
  number: true,// 是否使用数字
  lowercase: true,// 是否使用小写字母
  uppercase: true,// 是否使用大写字母
  symbol: true,// 是否使用特殊符号
})

// 密码表单校验规则
const passwordFormRules = reactive({
  name: [
    {required: true, message: t('passwordForm.form.name.verify'), trigger: 'blur'}
  ]
})

// 根据规则生成密码
const generatePassword = () => {
  if (!generateForm.number && !generateForm.symbol && !generateForm.lowercase && !generateForm.uppercase) {
    ElMessage.error(t('systemSetting.passwordRuleVerify'))
    return
  }

  // 密码池
  let pool = []
  if (generateForm.lowercase) {
    pool.push(passwordDist.lowercase);
  }
  if (generateForm.uppercase) {
    pool.push(passwordDist.uppercase);
  }
  if (generateForm.symbol) {
    pool.push(passwordDist.symbol);
  }
  if (generateForm.number) {
    pool.push(passwordDist.number);
  }

  passwordForm.password = randomText(pool, generateForm.length)
}

// 保存密码
const savePassword = async (passwordFormRef) => {

  // 校验密码表单
  await passwordFormRef.validate((valid) => {
    if (!valid) {
      // 校验未通过
      return
    }

    // 隐藏密码表单
    alertVisStatus.password = false
    if (passwordAlertMode.value === 'add') {
      // 新增密码设置id为时间戳
      passwordForm.id = Date.now()
      passwordForm.insertTime = moment().format("YYYY-MM-DD HH:mm:ss")
      // 触发密码新增事件
      emit('addPassword', JSON.parse(JSON.stringify(passwordForm)));
    } else {
      passwordForm.updateTime = moment().format("YYYY-MM-DD HH:mm:ss")
      // 触发密码修改事件
      emit('updatePassword', JSON.parse(JSON.stringify(passwordForm)));
    }

  })
}

// 初始化系统配置中的默认密码规则
const initRuleConfig = () => {
  let defaultPasswordRule = getSystemConfig('defaultPasswordRule')
  if (defaultPasswordRule) {
    for (let key in defaultPasswordRule) {
      generateForm[key] = defaultPasswordRule[key]
    }
  }
}

// 添加密码
const showAddPassword = () => {
  // 初始化系统配置中的默认密码规则
  initRuleConfig()
  // 使用默认的密码表单
  let password = defaultPassword()

  for (let key in password) {
    passwordForm[key] = password[key]
  }

  // 获取系统配置是否自动生成一次密码
  let autoGeneratePassword = getSystemConfig('autoGeneratePassword')
  if (autoGeneratePassword) {
    // 生成密码
    generatePassword()
  }

  // 设置表单模式为新增
  passwordAlertMode.value = 'add';
  // 显示表单
  alertVisStatus.password = true
}

// 修改密码
const showUpdatePassword = (password) => {
  // 初始化系统配置中的默认密码规则
  initRuleConfig()

  for (let key in passwordForm) {
    passwordForm[key] = password[key]
  }

  // 设置表单模式为修改
  passwordAlertMode.value = 'update'
  // 显示表单
  alertVisStatus.password = true
}

// 导出的方法
defineExpose({
  showAddPassword,
  showUpdatePassword
});
</script>

<template>
  <el-drawer
      v-model="alertVisStatus.password"
      :title="passwordAlertMode === 'add'?t('passwordForm.form.addPassword'):t('passwordForm.form.editPassword')"
      size="620px"
      direction="rtl"
  >
    <el-form ref="passwordFormRef" :model="passwordForm" :rules="passwordFormRules" label-width="100px"
             style="padding-right: 30px">
      <el-form-item :label="t('password.name')" prop="name">
        <el-input v-model="passwordForm.name" clearable></el-input>
      </el-form-item>
      <el-form-item :label="t('password.address')">
        <el-input v-model="passwordForm.address" clearable></el-input>
      </el-form-item>
      <el-form-item :label="t('password.userName')">
        <el-input v-model="passwordForm.userName" clearable/>
      </el-form-item>
      <el-form-item :label="t('password.password')">
        <el-card style="width: 100%;">
          <el-row>
            <el-col>
              <el-input v-model="passwordForm.password" clearable>
                <template #append>
                  <el-button @click="copyText(passwordForm.password)">{{t('passwordForm.generateForm.password.copy')}}</el-button>
                </template></el-input>
            </el-col>
          </el-row>
          <el-row style="margin-top: 15px">
            <el-col :span="6" style="text-align: center">
              <el-checkbox size="small" v-model="generateForm.uppercase" :label="t('passwordForm.generateForm.uppercase')" border/>
            </el-col>
            <el-col :span="6" style="text-align: center">
              <el-checkbox size="small" v-model="generateForm.lowercase" :label="t('passwordForm.generateForm.lowercase')" border/>
            </el-col>
            <el-col :span="6" style="text-align: center">
              <el-checkbox size="small" v-model="generateForm.number" :label="t('passwordForm.generateForm.number')" border/>
            </el-col>
            <el-col :span="6" style="text-align: center">
              <el-checkbox size="small" v-model="generateForm.symbol" :label="t('passwordForm.generateForm.symbol')" border/>
            </el-col>
          </el-row>
          <el-row style="margin-top: 15px">
            <el-col style="text-align: center">
              <el-input v-model="generateForm.length" size="small" style="width: 120px;">
                <template #prepend>{{ t('passwordForm.generateForm.length') }}</template>
              </el-input>

              <el-button plain size="small" style="position: relative;top:-5px;margin-left: 10px" type="success"
                         @click="generatePassword">{{ t('passwordForm.generateForm.randomPassword') }}
              </el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-form-item>
      <el-form-item :label="t('password.group')">
        <el-tree-select
            v-model="passwordForm.group"
            value-key="id"
            :data="groupTree"
            check-strictly
            :placeholder="t('password.group.placeholder')"
            filterable
        />
      </el-form-item>
      <el-form-item :label="t('password.remark')">
        <el-input type="textarea" :placeholder="t('passwordForm.generateForm.remark')" :rows="4"
                  v-model="passwordForm.remark"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
          <span class="dialog-footer">
            <el-button @click="savePassword(passwordFormRef)" type="primary">
              {{ t('passwordForm.generateForm.save')}}
            </el-button>
          </span>
    </template>
  </el-drawer>
</template>

<style scoped>

</style>