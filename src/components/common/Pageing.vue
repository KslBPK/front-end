<template>
    <div>
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
        :page-sizes="[5, 10, 20, 30]"
        >
        </el-pagination>
    </div>
</template>
<script>
import {getData} from '../../api/api'
export default {
    props: {
        "total": Number,
        "callback": Function
    },
    data(){
        return {
        // 总页数
        // total: 0,
        // 当前页数
        currentPage: 1,
        // 每页显示条数
        pageSize: 10
        }
    },
    methods: {
      // 分页函数
      // 获取每页条数的参数
      hanldSizeChange(val){
        // console.log(val)
        this.pageSize =val
        this.currentPage = 1
        getData(this.$parent, '/attends', {offset: (this.currentPage - 1), limit: val})
      },
      // 获取当前页面页数的参数
      hanldCurrentChange(val){
        // // console.log(val)
        this.currentPage = val
        getData(this.$parent, '/attends', {offset: (val - 1) * this.pageSize, limit: this.pageSize})
      },
    }
}
</script>
<style>
.el-pagination{
    text-align: right;
    margin-top: 20px;
}
</style>