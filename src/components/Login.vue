<script setup>
import {reactive} from 'vue'

const ruleFormRef = ref()

const ossForm = reactive({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAI5tCRNWDPjWAv3LtoY6L5',
  accessKeySecret: 'OLqXTYOJDlqzpeCVLOsksS8mWHNlmJ'
})

const formRules = reactive({
  region: [
    {required: true, message: '请输入region', trigger: 'blur'}
  ],
  accessKeyId: [
    {required: true, message: '请输入accessKeyId', trigger: 'blur'}
  ],
  accessKeySecret: [
    {required: true, message: '请输入accessKeySecret', trigger: 'blur'}
  ]
})

const submitForm = async (ruleFormRef) => {
  await ruleFormRef.validate((valid, fields) => {
    if (valid) {
      loginOSS()
    } else {
      console.log('error submit!', fields)
    }
  })
}
const loginOSS = () => {
  alert('ok')
}

</script>

<template>
  <img alt="" class="back-img"
       src="~@/assets/images/backImg.svg">
  <div class="content">
    <div class="content-input">
      <div class="title">
        阿里云OSS配置
      </div>
      <el-form ref="ruleFormRef" :rules="formRules" :model="ossForm">
        <el-form-item prop="region">
          <el-input v-model="ossForm.region" clearable placeholder="OSS region"></el-input>
        </el-form-item>
        <el-form-item prop="accessKeyId">
          <el-input v-model="ossForm.accessKeyId" clearable placeholder="OSS accessKeyId"></el-input>
        </el-form-item>
        <el-form-item prop="accessKeySecret">
          <el-input v-model="ossForm.accessKeySecret" clearable placeholder="OSS accessKeySecret"></el-input>
        </el-form-item>
      </el-form>

      <div class="content-button">
        <el-button type="primary" style="width: 100%;" @click="submitForm(ruleFormRef)">登录</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.back-img {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1
}

.content {
  width: 500px;
  height: 380px;
  box-sizing: border-box;
  padding: 0 50px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(105, 105, 105, 0.1);
  background: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: mymove 1s ease-in-out alternate;
  overflow: hidden;
  transition: 1.5s;
}

@keyframes mymove {
  0% {
    height: 0;
  }

  100% {
    height: 380px;
  }
}

.content-input {
  width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}

.content-button {
  margin-top: 10px;
}



.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 30px;
  padding-top: 0;
  margin-top: 0;
  font-weight: bold;
  color: #606266;
}

</style>
