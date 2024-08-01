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
        <el-form-item>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <!-- 可以在getData()方法中找到“英文名_text”的原因 -->
      <!-- tableData.slice((当前页数-1)*每页条数，当前页数*当前条数) -->
      <el-table :data="tableData.slice((currentPage-1) * pageSize, currentPage * pageSize)" border style="width: 100%">
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="sex_text" label="性别" align="center"></el-table-column>
        <el-table-column prop="age" label="年龄" align="center"></el-table-column>
        <el-table-column prop="number" label="学号" align="center"></el-table-column>
        <el-table-column prop="class_text" label="班级" align="center"></el-table-column>
        <el-table-column prop="state_text" label="状态" align="center"></el-table-column>
        <el-table-column prop="address" label="地址" align="center"></el-table-column>
        <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="130">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="updateInfo(scope.row)"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- 这里用的是前端分页，在作业列表中使用的是后端分页 -->
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
      <!-- 添加信息和修改信息弹窗 -->
      <!-- :visible.sync="addStu"控制弹窗的显示和隐藏 -->
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
        tableData: [],
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
          name: [{required: true, message: "请输入姓名",trigger: 'blur'}],
          sex: [{required: true,}],
          age: [{required: true, message: "请输入年龄",trigger: 'blur'},
                {type: 'number', message:"年龄必须是数字值",trigger: 'blur'}],
          number: [{required: true, message: "请输入姓名",trigger: 'blur'},
                {type: 'number', message:"学号必须是数字值",trigger: 'blur'}],
          class: [{required: true, message: "请选择班级",}],
          state: [{required: true, message: "请选择状态",}],
          address: [{required: true, message: "请输入地址",trigger: 'blur'}],
          phone: [{required: true, message: "请输入联系方式",trigger: 'blur'}],
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

    // 这里是页面加载时同时执行的方法
    created() {
      this.getData()
    },

    methods: {
      // 分页函数
      // 获取每页条数的参数
      hanldSizeChange(val){
        // console.log(val)
        this.pageSize =val
        this.currentPage = 1
      },
      // 获取当前页面页数的参数
      hanldCurrentChange(val){
        // console.log(val)
        this.currentPage = val
      },

      // 获取数据
      // 显示后端的表格数据
      getData(){
        // 这里是获取后端里数据的总条数，用来返回给limit，用于分页
        this.service.get('/students/count')
        .then(res => {
          // console.log(res)
          res.status === 200 ? this.total = res.data : this.total = 0
          console.log(this.total)
          this.service.get('/students?limit=' + this.total)
          .then(res => {
            if (res.status === 200){
              console.log(res)
              // 给单选和多选项传来的值进行封装，这样传输的一直是数字值，而显示的是中文封装过的值
              res.data.forEach(item => {
                // 对表格中的“性别”中的值进行封装
                item.sex === "1" ? item.sex_text = "男" : item.sex_text = "女"
                // 对表格中的“状态”中的值进行封装
                if(item.state === "1"){
                  item.state_text = "已入学"
                }else if(item.state === "2"){
                  item.state_text = "未入学"
                }else{
                  item.state_text = "休学中"
                }
                // 对表格中的“班级”中的值进行封装
                if(item.class === "1"){
                  item.class_text = "一班"
                }else if(item.class === "2"){
                  item.class_text = "二班"
                }else if(item.class === "3"){
                  item.class_text = "三班"
                }else if(item.class === "4"){
                  item.class_text = "四班"
                }else if(item.class === "5"){
                  item.class_text = "五班"
                }else if(item.class === "6"){
                  item.class_text = "六班"
                }else if(item.class === "7"){
                  item.class_text = "七班"
                }else{
                  item.class_text = "八班"
                }
              })
              this.tableData = [...res.data] 
            } else{

            }
          })
          .catch(err => {
            console.error(err)
          })
        })
        .catch(err => {
          console.error(err)
        })
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
        // 点击删除按钮，弹出确认删除的弹窗
        this.$alert('你确定要删除该数据吗？', '提示', {
          confirmButtonText: '确定',
          callback: () => {
            this.service.delete('/students/' + row.id)
            .then(res => {
              console.log(res)
              if (res.status === 204){
                this.$message({message: '删除数据成功',type: 'success',duration: 1500});
                // 删除后返回值为204，那么就重新刷新表格
                this.getData()
              }
            })
            .catch(err => {
                console.error(err)
            })
          }
        });
        console.log(row) 
      },

      // 查询
      find() {
        // formInline是查询时要输入的内容
        console.log(this.formInline)
        this.service.get('/students', {
          params: this.formInline
        })
        .then(res => {
          console.log(res)
          if (res.status === 200){
            this.tableData = [...res.data]
          }
        })
        .catch(err => {
          console.error(err)
        })
      },

      // 重置
      reset(){
        this.formInline = {}
        this.getData()
      },

      // 新增
      addStudent() {
        // 改变title为添加信息
        this.state= true
        // 显示弹窗
        this.addStu = true
        // 重置表单数据
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
      },
      // 确定新增
      sure(form) {
        // 对表单进行验证
        this.$refs[form].validate((valid) =>{
          if(valid){
            // 如果用户输入信息没有违反规则，则执行以下命令

                  // 假后端,让新增的信息显示在表格中
                  // this.tableData.push(this.form)

            // 判断state是true还是false
            if(this.state){
              // 如果state为true，则表示使用的新增功能，执行以下代码
              // 调用添加接口
              this.service.post('/students', this.form)
              .then(res => {
                // console.log(res) 
                if(res.status === 201){
                  // 新增完后关闭弹窗
                  this.addStu = false
                  // 对整个表单进行重置
                  this.$refs[form].resetFields()
                  // 弹出新增成功的消息
                  this.$message({message: '新增数据成功',type: 'success',duration: 1500});
                  // 调用getData()方法，再次重新加载表格
                  this.getData()
                }
              })
              .catch(err => {
                console.error(err)
              })
            }else{
              // 如果state为false，则表示使用的修改功能，执行以下代码
              // 调用修改接口
              // 删除创建时间
              // delete this.form.createdDate
              // 删除最后修改时间
              // delete this.form,lastModifiedDate
              // console.log(this.form.id)
              
              this.service.patch('/students/' + this.form.id,this.form)
              .then(res => {
                this.addStu = false
                // 弹出新增成功的消息
                this.$message({message: '修改数据成功',type: 'success',duration: 1500});
                this.getData()
              })
              .catch(err => {
                console.error(err)
              })
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

  .studentlist .el-pagination{
    text-align: right;
    margin-top: 20px;
  }
  </style>
  