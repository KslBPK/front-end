<template>
    <div class='header'>
        <el-header>
            <div class='title'>后台管理系统</div>
            <div>KslBPK</div>
        </el-header>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Header',
    data () {
      return {
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .header .el-header{
    background: #409eff;
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
  