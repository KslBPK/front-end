<template>
    <div class="breadcrumb">
        <el-card>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <!-- $route.matched包含了当前路由匹配的所有记录（route records） -->
            <el-breadcrumb-item v-for="(matched,index) in $route.matched " :key='index'>
              {{matched.name}}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BreadCrumb',
    data () {
      return {
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  