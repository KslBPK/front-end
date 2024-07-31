<template>
    <div class="worklist">
      <!-- 查询 -->
      <el-form :inline="true" :model="formInline" class="inline" size="small">
        <el-form-item label="作业名称">
          <el-input v-model="formInline.jobName" placeholder="请输入作业名称查询"></el-input>
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
        <el-table-column prop="jobName" label="作业名称" align="center"></el-table-column>
        <el-table-column prop="completedNumber" label="完成人数" align="center"></el-table-column>
        <el-table-column prop="uncompletedNumber" label="未完成人数" align="center"></el-table-column>
        <el-table-column prop="completion" label="完成率" align="center"></el-table-column>
        <el-table-column prop="check" label="待批改" align="center"></el-table-column>
        <el-table-column prop="checkRate" label="批改率" align="center"></el-table-column>
        <el-table-column prop="passNumber" label="及格人数" align="center"></el-table-column>
        <el-table-column prop="goodNumber" label="优秀人数" align="center"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- 这里使用的是后端分页，在学生列表中使用的是前端分页 -->
      <!-- total分页数据的总个数 -->
      <!-- currentPage当前的页数 -->
      <!-- pageSize每一页的显示条数 -->
      <el-pagination
        background
        @size-change="hanldSizeChange"
        @current-change="hanldCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[5, 10, 20, 30]">
      </el-pagination>
    </div>
  </template>
  
  <script>
  import {getData} from '../../api/api'
  export default {
    name: 'WorkList',
    data () {
      return {
        tableData: [],
        formInline: {
          jobName: "",
        },

        //分页数据
        // 总页数
        total: 0,
        // 当前页数
        currentPage: 1,
        // 每页显示条数
        pageSize: 10
      }
    },

    created(){
      let curr = (this.currentPage - 1) * this.pageSize
      // 引入api中的getData()方法
      getData(this, '/works', {offset: this.curr, limit: this.pageSize})
    },  

    methods: {
      // 分页函数
      // 获取每页条数的参数
      hanldSizeChange(val){
        // console.log(val)
        this.pageSize =val
        this.currentPage = 1
        getData(this, '/works', {offset: (this.currentPage - 1), limit: val})
      },
      // 获取当前页面页数的参数
      hanldCurrentChange(val){
        // console.log(val)
        this.currentPage = val
        getData(this, '/works', {offset: (val - 1) * this.pageSize, limit: this.pageSize})
      },

      // 查询
      find() {
        // console.log(this.formInline)
        getData(this, '/works', this.formInline)
      },

      // 重置
      reset(){
        // console.log(this.formInline)
        this.formInline = {}
        getData(this, '/works', {})
      },
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style>
  .worklist .inline{
    text-align: left;
  }

  .worklist .el-pagination{
    text-align: right;
    margin-top: 20px;
  }
  </style>
  