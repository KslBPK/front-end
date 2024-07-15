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
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" align="center"></el-table-column>
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
      <!-- :visible.sync="dialogFormVisible"控制弹窗的显示和隐藏 -->
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
    </div>
  </template>
  
  <script>
  export default {
    name: 'InfoList',
    data () {
      return {
        state: true,
        addStu: false,
        formLabelWidth: "80px",
        tableData: [

        ],
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
          name: [{required: true, message: "请输入姓名",}],
          sex: [{required: true,}],
          age: [{required: true, message: "请输入年龄",},
                {type: 'number', message:"年龄必须是数字值"}],
          data: [{required: true, message: "请输入出生时间",}],
          idCard: [{required: true, message: "请输入身份证号",}],
          address: [{required: true, message: "请输入地址",}],
          time: [{required: true, message: "请输入入校时间",}],
          phone: [{required: true, message: "请输入联系方式",}],
        },
      }
    },
    methods: {
      // 新增
      addStudent() {
        this.addStu = true
      },
      // 修改
      updateInfo(row) {
        console.log(row)
        // 改变title为修改信息
        this.state= false
        // 显示弹窗
        this.addStu = true
        // 对应的每一项数据内容展现到表单里
        this.form = row
      },
      // 删除
      del(row) {
        console.log(row)
      },
      // 查询
      find() {
        console.log(this.formInline)
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
  