<template>
    <div class="infolist">
      <!-- 新增和查询 -->
      <el-form :inline="true" :model="formInline" class="inline" size="small">
        <el-form-item>
          <el-button type="primary" @click="addStudent">新增</el-button>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formInline.name" placeholder="请输入姓名查询"></el-input>
        </el-form-item>
        <el-form-item label="父亲">
          <el-input v-model="formInline.father" placeholder="请输入学生父亲姓名查询"></el-input>
        </el-form-item>
        <el-form-item label="母亲">
          <el-input v-model="formInline.mather" placeholder="请输入学生母亲姓名查询"></el-input>
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
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="sex_text" label="性别" align="center"></el-table-column>
        <el-table-column prop="age" label="年龄" align="center"></el-table-column>
        <el-table-column prop="data" label="出生日期" align="center"></el-table-column>
        <el-table-column prop="idCard" label="身份证号" align="center"></el-table-column>
        <el-table-column prop="father" label="父亲" align="center"></el-table-column>
        <el-table-column prop="mather" label="母亲" align="center"></el-table-column>
        <el-table-column prop="address" label="家庭住址" align="center"></el-table-column>
        <el-table-column prop="time" label="入校时间" align="center"></el-table-column>
        <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="130">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="updateInfo(scope.row)"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加信息和修改信息弹窗 -->
      <!-- :visible.sync="addStu"控制弹窗的显示和隐藏 -->
      <!-- :title="state ? '添加信息' : '修改信息'"  动态题目，如果state为true就显示添加信息，如果为false那就显示修改信息 -->
      <el-dialog :title="state ? '添加学生信息' : '修改学生信息'" :visible.sync="addStu"  width="500px">
        <el-form :model="form" :rules="formrules" ref="form">
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
            <el-radio v-model="form.sex" label="1">男</el-radio>
            <el-radio v-model="form.sex" label="2">女</el-radio>
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
            <el-input v-model.number="form.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出生日期" :label-width="formLabelWidth" prop="data">
            <el-input v-model="form.data" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" :label-width="formLabelWidth" prop="idCard">
            <el-input v-model.number="form.idCard" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="父亲姓名" :label-width="formLabelWidth" prop="father">
            <el-input v-model="form.father" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="母亲姓名" :label-width="formLabelWidth" prop="mather">
            <el-input v-model="form.mather" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="家庭地址" :label-width="formLabelWidth" prop="address">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="入校时间" :label-width="formLabelWidth" prop="time">
            <el-input v-model="form.time" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addStu = false">取 消</el-button>
          <el-button type="primary" @click="sure('form')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分页 -->
      <Pageing :total="total" :url="url"></Pageing>
    </div>
  </template>
  
  <script>
  import url from 'postcss-url';

  import {getData, changeInfo, remove} from '../../api/api'
  
  import Pageing from '../common/Pageing.vue';
  export default {
    components: {
      Pageing
    },
    name: 'InfoList',
    data () {
      return {
        url: '/infos',
        total: 0,
        state: true,
        addStu: false,
        formLabelWidth: "80px",
        tableData: [],
        formInline: {
          name: "",
          father: "",
          mather: "",
        },
        form: {
          name: "",
          sex: "1",
          age: "",
          data: "",
          idCard: "",
          father: "",
          mather: "",
          address: "",
          time: "",
          phone: "",
        },
        // 验证规则
        formrules: {
          name: [{required: true, message: "请输入姓名",trigger: 'blur'}],
          sex: [{required: true,}],
          age: [{required: true, message: "请输入年龄",trigger: 'blur'},
                {type: 'number', message:"年龄必须是数字值",trigger: 'blur'}],
          data: [{required: true, message: "请输入出生时间",trigger: 'blur'}],
          idCard: [{required: true, message: "请输入身份证号",trigger: 'blur'}],
          address: [{required: true, message: "请输入地址",trigger: 'blur'}],
          time: [{required: true, message: "请输入入校时间",trigger: 'blur'}],
          phone: [{required: true, message: "请输入联系方式",trigger: 'blur'}],
        },
      }
    },
    created() {
      getData(this,'/infos')
    },
    methods: {


      // 新增
      addStudent() {
        // 改变title为添加信息
        this.state= true
        // 显示弹窗
        this.addStu = true
        // 重置表单中的数据
        this.form = {
          name: "",
          sex: "1",
          age: "",
          data: "",
          idCard: "",
          father: "",
          mather: "",
          address: "",
          time: "",
          phone: "",
        }
      },

      // 修改
      updateInfo(row) {
        console.log(row)
        // 改变title为修改信息
        this.state= false
        // 显示弹窗
        this.addStu = true
        // 对应的每一项数据内容展现到表单里
        this.form = {...row}
      },

      // 删除
      del(row) {
        remove(this, '你确定要删除该数据吗?', '提示', '确定', '/infos', '删除数据成功', row.id, getData)
        console.log(row)
      },

       // 查询
       find() {
        // console.log(this.formInline)
        getData(this, '/infos', this.formInline)
      },

      // 重置
      reset(){
        // console.log(this.formInline)
        this.formInline = {}
        getData(this, '/infos', {})
      },

      // 确定新增和修改
      sure(form) {
         // 对表单进行验证
         this.$refs[form].validate((valid) =>{
          if(valid){
            // 调用添加接口
            // 假后端,让新增的信息显示在表格中
            // this.tableData.push(this.form)
            if(this.state){
              // 调用添加接口
              changeInfo(this, 'post', '/infos', '新增数据成功', form, getData)
            }else{
              // 调用修改接口
              changeInfo(this, 'patch', '/infos', '修改数据成功', form, getData)
            }
          }else{
            console.error(this.form)
          }
        })
      },
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style>
   .infolist .inline{
    text-align: left;
  }

  .infolist .el-form-item{
    text-align: left;
  }

  .infolist .el-select {
    width: 100%;
  }

  .dialog-footer{
    text-align: center;
  }
  </style>
  