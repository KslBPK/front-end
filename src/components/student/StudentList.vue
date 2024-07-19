<template>
    <div class="studentlist">
      <!-- 新增和查询 -->
      <el-form :inline="true" :model="formInline" class="inline" size="small">
        <el-form-item>
          <el-button type="primary" @click="addStudent">新增</el-button>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formInline.name" placeholder="请输入姓名查询"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="formInline.number" placeholder="请输入学号查询"></el-input>
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
        <el-table-column prop="number" label="学号" align="center"></el-table-column>
        <el-table-column prop="class" label="班级" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" align="center"></el-table-column>
        <el-table-column prop="address" label="地址" align="center"></el-table-column>
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
      <el-dialog :title="state ? '添加信息' : '修改信息'" :visible.sync="addStu"  width="500px">
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
          <el-form-item label="学号" :label-width="formLabelWidth" prop="number">
            <el-input v-model.number="form.number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="班级" :label-width="formLabelWidth" prop="class">
            <el-select v-model="form.class" placeholder="请选择班级">
              <el-option label="一班" value="1"></el-option>
              <el-option label="二班" value="2"></el-option>
              <el-option label="三班" value="3"></el-option>
              <el-option label="四班" value="4"></el-option>
              <el-option label="五班" value="5"></el-option>
              <el-option label="六班" value="6"></el-option>
              <el-option label="七班" value="7"></el-option>
              <el-option label="八班" value="8"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth" prop="state">
            <el-select v-model="form.state" placeholder="请选择状态">
              <el-option label="已入学" value="1"></el-option>
              <el-option label="未入学" value="2"></el-option>
              <el-option label="休学中" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
            <el-input v-model="form.address" autocomplete="off"></el-input>
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
    name: 'StudentList',
    data () {
      return {
        state: true,
        addStu: false,
        formLabelWidth: "80px",
        tableData: [

        ],
        formInline: {
          name: "",
          number: ""
        },
        form: {
          name: '',
          sex: '1',
          age: '',
          number: '',
          class: '1',
          state: '1',
          address: '',
          phone: '',
        },
        // 验证规则
        formrules: {
          name: [{required: true, message: "请输入姓名",}],
          sex: [{required: true,}],
          age: [{required: true, message: "请输入年龄",},
                {type: 'number', message:"年龄必须是数字值"}],
          number: [{required: true, message: "请输入姓名",},
                {type: 'number', message:"学号必须是数字值"}],
          class: [{required: true, message: "请选择班级",}],
          state: [{required: true, message: "请选择状态",}],
          address: [{required: true, message: "请输入地址",}],
          phone: [{required: true, message: "请输入联系方式",}],
        },
      }
    },
    methods: {
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
      // 新增
      addStudent() {
        this.addStu = true
      },
      // 查询
      find() {
        console.log(this.formInline)
      },
      // 确定新增
      sure(form) {
        // 对表单进行验证
        this.$refs[form].validate((valid) =>{
          if(valid){
            if(this.state){
            // 调用添加接口
            // 假后端,让新增的信息显示在表格中
            this.tableData.push(this.form)

            console.log(this.form)
            this.addStu = false
            this.form = {
              name: '',
              sex: '1',
              age: '',
              number: '',
              class: '1',
              state: '1',
              address: '',
              phone: '',
            }
              // 调用添加接口
              this.service.post('/students', this.form)
              .then(res => {
                console.log(res)
                this.service.get('/students')
                .then(res => {
                  console.log(res)
                })
                .catch(err => {
                  console.log(err)
                })
              })
              .catch(err => {
                console.error(err)
              })
            }else{
              // 调用修改接口
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
  .studentlist .inline{
    text-align: left;
  }

  .studentlist .el-form-item{
    text-align: left;
  }

  .studentlist .el-select {
    width: 100%;
  }

  .dialog-footer{
    text-align: center;
  }
  </style>
  