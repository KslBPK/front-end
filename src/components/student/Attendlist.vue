<template>
    <div class="attendlist">
      <!-- 查询 -->
      <el-form :inline="true" :model="formInline" class="inline" size="small">
        <el-form-item label="学生姓名">
          <el-input v-model="formInline.attendName" placeholder="请输入姓名查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="find">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="attendName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="class" label="班级" align="center"></el-table-column>
        <el-table-column prop="actual" label="实到课" align="center"></el-table-column>
        <el-table-column prop="toBeDue" label="应到课" align="center"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pageing :total="total" :url="url"></Pageing>
    </div>
  </template>
  
  <script>
  import url from 'postcss-url';
  
  import {getData} from '../../api/api'

  import Pageing from '../common/Pageing.vue';
  export default {
    components: {
      Pageing
    },
    name: 'WorkList',
    data () {
      return {
        tableData: [],
        formInline: {
            attendName: "",
        },
        total: 0,
        url: '/attends'
      }
    },

    created(){
      // 引入api中的getData()方法
      getData(this, '/attends')
    },  

    methods: {
      // 查询
      find() {
        // console.log(this.formInline)
        getData(this, '/attends', this.formInline)
      },

      // 重置
      reset(){
        // console.log(this.formInline)
        this.formInline = {}
        getData(this, '/attends', {})
      },
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style>
  .attendlist .inline{
    text-align: left;
  }

  .attendlist .el-pagination{
    text-align: right;
    margin-top: 20px;
  }
  </style>
  