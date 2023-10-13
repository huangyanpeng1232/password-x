<script setup>
import {useI18n} from "vue-i18n";
import {v4 as uuid} from "uuid";
import {getSystemConfig, randomText,copyText} from "@/utils/global.js";

// 事件声明
const emit = defineEmits(['addPassword', 'updatePassword'])

const {t} = useI18n()

const passwordFormRef = ref()

// 弹框显示控制
const alertVisStatus = reactive({
  password: false
})
// 密码弹框模式
const passwordAlertMode = ref('')

// 密码字典
const passwordDist = reactive({
  uppercase: "ABCDEFGHJKLMNPQRSTUVWXYZ",
  lowercase: "abcdefghjkmnpqrstuvwxyz",
  number: "0123456789",
  symbol: "~!@#$^&*()_+.,;",
})

const defaultPassword = () => {
  return {
    id: '',
    name: '',
    address: '',
    userName: '',
    password: '',
    remark: ''
  }
}

// 密码表单
const passwordForm = reactive(defaultPassword())

// 密码生成规则表单
const generateForm = reactive({
  length: 16,
  number: true,
  lowercase: true,
  uppercase: true,
  symbol: true,
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
    ElMessage.error('必须选择一种密码字符类型')
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

  await passwordFormRef.validate((valid) => {
    if (!valid) {
      return
    }

    alertVisStatus.password = false
    if (passwordAlertMode.value === 'add') {
      passwordForm.id = uuid()
      emit('addPassword', passwordForm);
    } else {
      emit('updatePassword', passwordForm);
    }
  })
}

const initRuleConfig = () => {
  let defaultPasswordRule = getSystemConfig('defaultPasswordRule')
  if (defaultPasswordRule) {
    for (let key in defaultPasswordRule) {
      generateForm[key] = defaultPasswordRule[key]
    }
  }
}

// 添加密码
const addPassword = () => {
  initRuleConfig()
  let password = defaultPassword()
  for (let key in password) {
    passwordForm[key] = password[key]
  }

  let autoGeneratePassword = getSystemConfig('autoGeneratePassword')
  if (autoGeneratePassword) {
    generatePassword()
  }

  passwordAlertMode.value = 'add';
  alertVisStatus.password = true
}

// 修改密码
const updatePassword = (password) => {
  initRuleConfig()
  for (let key in password) {
    passwordForm[key] = password[key]
  }

  passwordAlertMode.value = 'update'
  alertVisStatus.password = true
}

defineExpose({
  addPassword,
  updatePassword
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
        <el-input v-model="passwordForm.name"></el-input>
      </el-form-item>
      <el-form-item :label="t('password.address')">
        <el-input v-model="passwordForm.address"></el-input>
      </el-form-item>
      <el-form-item :label="t('password.userName')">
        <el-input v-model="passwordForm.userName" clearable/>
      </el-form-item>
      <el-form-item :label="t('password.password')">
        <el-card style="width: 100%;">
          <el-row>
            <el-col>
              <el-input v-model="passwordForm.password">
                <template #append>
                  <el-button @click="copyText(passwordForm.password)">复制</el-button>
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
            <el-col :span="8" :offset="8">
              <el-input size="small" v-model="generateForm.length">
                <template #prepend>{{ t('passwordForm.generateForm.length') }}</template>
              </el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-button size="small" style="position: relative;top:-5px" type="success" plain
                         @click="generatePassword">{{ t('passwordForm.generateForm.randomPassword') }}
              </el-button>
            </el-col>
          </el-row>
        </el-card>
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