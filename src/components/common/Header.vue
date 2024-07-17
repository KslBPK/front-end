<template>
    <div class='header'>
        <el-header>
            <div class='title'>后台管理系统</div>
            <div>{{name}}</div>
        </el-header>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Header',
    data () {
      return {
        name: ''
      }
    },
    created(){
      // 将存储在localStorage的值取出
      this.name = localStorage.getItem("username")
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .header .el-header{
    background: #545c64;
    color: #ffffff;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
  }

  .title{
    width: 200px;
    font-size: 24px;
  }
  </style>
  