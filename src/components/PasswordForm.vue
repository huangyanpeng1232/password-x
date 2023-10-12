<script setup>
import {useI18n} from "vue-i18n";

const {t} = useI18n()
// 弹框显示控制
const alertVisStatus = reactive({
  password: false
})
// 密码弹框模式
const passwordAlertTitle = ref('')

// 密码字典
const passwordDist = reactive({
  uppercase: "ABCDEFGHJKLMNPQRSTUVWXYZ",
  lowercase: "abcdefghjkmnpqrstuvwxyz",
  number: "0123456789",
  symbol: "~!@#$^&*()_+.,;",
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

}

// 保存密码
const savePassword = () => {
  alertVisStatus.password = false
}

// 添加密码
const addPassword = () => {
  passwordAlertTitle.value = t('passwordForm.form.addPassword')
  alertVisStatus.password = true
}

// 修改密码
const updatePassword = (password) => {
  for (let key in password) {
    passwordForm[key] = password[key]
  }

  passwordAlertTitle.value = t('passwordForm.form.editPassword')
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
      :title="passwordAlertTitle"
      size="550px"
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
              <el-input v-model="passwordForm.password"></el-input>
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
            <el-col :span="10" :offset="7">
              <el-input size="small" v-model="generateForm.length">
                <template #prepend>{{ t('passwordForm.generateForm.length') }}</template>
              </el-input>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-button size="small" style="position: relative;top:-5px" type="success" plain
                         @click="generatePassword">{{ t('passwordForm.generateForm.randomPassword') }}
              </el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-form-item>
      <el-form-item :label="t('password.remark')">
        <el-input type="textarea" :placeholder="t('passwordForm.generateForm.remark')" :rows="4" v-model="generateForm.remark"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
          <span class="dialog-footer">
            <el-button @click="savePassword()" type="primary">
              {{ t('passwordForm.generateForm.save')}}
            </el-button>
          </span>
    </template>
  </el-drawer>
</template>

<style scoped>

</style>