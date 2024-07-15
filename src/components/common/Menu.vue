<template>
    <div class="menu">
      <!-- @open和@close展开和关闭的两个方法 -->
      <!-- active-text-color是选中的菜单中字体颜色改变 -->
      <!-- router点击每个菜单跳转到相应的界面 -->
      <!-- default-active	当前激活菜单的 index -->
      <el-menu :default-active="activePath" 
               class="el-menu-vertical-demo" 
               @open="handleOpen" 
               @close="handleClose" 
               background-color="#545c64" 
               active-text-color="#ffd04b"
               text-color="#fff"
               router
               >
            <!-- v-for是一个指令，用于渲染列表或重复元素 -->
            <!-- v-for指令的基本语法是(item, index) in items -->
            <!-- 其中items是你希望遍历的数组 -->
            <!-- item和index分别是当前迭代项的值和索引 -->
            <!-- :key="index" 则是告诉 Vue 使用这个索引作为每个生成元素的唯一标识符。 -->
            <!-- key要和v-for放在同一层上 -->
            <!-- v-if判断有没有hidden属性，没有就显示 -->
              <div  v-for="(menuitem, index) in menus" :key="index" v-if="!menuitem.hidden">
                <el-submenu :index="index + ''">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{ menuitem.name }}</span>
                  </template>
                  <el-menu-item-group>
                    <div v-for="(child, index) in menuitem.children" :key="index">
                      <el-menu-item :index= "child.path">{{child.name}}</el-menu-item>
                    </div>
                  </el-menu-item-group>
                </el-submenu>  
              </div>
          </el-menu>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Menu',
    data () {
      return {
        // 创建数组menus
        menus: [],
        activePath:''
      }
    },
    created(){
      // console.log(this.$router.options.routes)
      // 使用menus数组，赋值路由信息
      // 然后在上面遍历数组
      this.menus = [...this.$router.options.routes]
      // console.log(this.$router.currentRoute.path)
      //获取路由地址
      this.activePath = this.$router.currentRoute.path
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
.menu{
  height: 100%;
  width:  100%;
}

.menu .el-menu{
  height: 100%;
}

.menu .el-submenu .el-meun-i{
  min-width: 0;
} 
  </style>
  