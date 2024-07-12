<template>
    <div class="login">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>后台管理系统</span>
        </div>
        <el-form :model="form" ref="form" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login('form')">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Login',
    data () {
      return {
        form:{
          username: '',
          password: ''
        }
      }
    },
    methods:{
      //登录
      login(form) {
          //获取表单中的信息
          console.log(this.form)
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .login{
    width: 100%;
    height: 100%;
    position: absolute;
    background: #409eff;
  }

  .login .box-card{
    width: 450px;
    margin: 200px auto;
  }

  .clearfix{
    font-size: 34px;
  }

  .login .el-button{
    width: 100%;
  }
  </style>
  