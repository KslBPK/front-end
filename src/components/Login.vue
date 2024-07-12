<template>
    <div class="login">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>后台管理系统</span>
        </div>
        <el-form :model="loginform" :rules="loginrules" ref="loginvalue"  label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="loginform.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginform.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login('loginvalue')">登录</el-button>
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
        //
        //添加表单中的数据对象
        loginform:{
          username: '',
          password: ''
        },
        // 制定规则
        loginrules:{
          // 用户名验证
          username: [
            {
              // 是否必填
              required: true,
              // 如果没有填，弹出消息提醒
              message: '请输入用户名',
              // 这表示表单验证应该在元素失去焦点时触发
              trigger: 'blur'
            },
            {
              // 最少输入4位
              min: 4,
              // 最多输入10位
              max: 10,
              message: '长度在4-10位字符之间',
              // 如果没有这一条，就表示在你输入的过程中一直会有消息提醒
              trigger: 'blur'
            }
          ],
          //密码验证
          password: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur',
            },
            {
              min: 6,
              max: 12,
              message: '长度在6-12位字符之间',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods:{
      //登录
      login(loginvalue) {
          //打印表单中的用户名和密码信息到页面请求中
          // console.log(this.form)

          //验证输入内容是否通过制定的规则
          this.$refs[loginvalue].validate((valid) => {
            if(valid){
              this.$router.push('/')
            }else{
              console.error(this.form)
            }
          })
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
  