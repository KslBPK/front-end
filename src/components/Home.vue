<template>
  <div class="home">
    <!-- 页面头部 -->
    <Header></Header>
    <!-- 页面的内容 -->
    <el-container class="content">
      <div>
        <!-- 侧边菜单栏 -->
        <el-aside width="200px">
          <!-- @open和@close展开和关闭的两个方法 -->
          <!-- active-text-color是选中的菜单中字体颜色改变 -->
           <el-menu default-active="2" 
                    class="el-menu-vertical-demo" 
                    @open="handleOpen" 
                    @close="handleClose" 
                    background-color="#409EFF" 
                    active-text-color="#fff"
                    >
            <!-- v-for是一个指令，用于渲染列表或重复元素 -->
            <!-- v-for指令的基本语法是(item, index) in items -->
            <!-- 其中items是你希望遍历的数组 -->
            <!-- item和index分别是当前迭代项的值和索引 -->
            <!-- :key="index" 则是告诉 Vue 使用这个索引作为每个生成元素的唯一标识符。 -->
            <!-- key要和v-for放在同一层上 -->
              <div  v-for="(menuitem, index) in menus" :key="index" v-if="!menuitem.hidden">
                <el-submenu :index="index + ''">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{ menuitem.name }}</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item>选项1</el-menu-item>
                    <el-menu-item>选项2</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>  
              </div>
          </el-menu>
        </el-aside>
      </div>
      <el-main>
        <div>
          <!-- 路由出口（没有这个东西看不到界面） -->
          <router-view></router-view>
        </div>
        <Footer></Footer>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from './common/Header'
import Footer from './common/Footer'
import router from '../router';
export default {
  components:{
      Header : Header,
      Footer : Footer
  },
  name: 'Home',
  data () {
    return {
      // 创建数组menus
    menus: []
    }
  },
  created(){
    console.log(this.$router.options.routes)
    // 使用menus数组，赋值路由信息
    // 然后在上面遍历数组
    this.menus = [...this.$router.options.routes]
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
</style>
