<template>
  <el-row class="row" type="flex" justify="center" align="middle">
    <el-col :span="8">
      <el-form class="form" :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
// 引入axios
// eslint-disable-next-line
import axios from "axios";

export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 校验
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.loginForm.validate(valid => {
        // console.log(valid);
        // 格式校验 格式错误就不用执行了  也不用发送请求
        if (!valid) {
          return
        }
        // 开始登录
        console.log('开始登录')
        // 发送请求  判断登录的是否正确(登录正确跳转页面 , 不正确重新登录)
        axios
          .post('http://localhost:8888/api/private/v1/login', this.loginForm)
          .then(res => {
            console.log(res)
            // 登录成功的提示信息 登录成功后把token盾牌保存到本地
            localStorage.setItem('token', res.data.data.token)
            if (res.data.meta.status === 200) {
              this.$message({
                message: res.data.meta.msg,
                type: 'success',
                duration: 600
              })
              // 跳转到home页面
              this.$router.push('/home')
            }
          })
      })
    },
    resetForm () {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  height: 100%;
}
.row {
  height: 100%;
  background: #2d434c;
}
.form {
  background: #ffffff;
  padding: 25px;
  border-radius: 15px;
}
</style>
