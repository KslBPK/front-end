<template>
  <div class="home">
    <!-- 页面头部 -->
    <Header></Header>
    <!-- 页面的内容 -->
    <el-container class="content">
      <!-- 侧边菜单栏 -->
      <el-aside>
        <Menu></Menu>
      </el-aside>
      <el-main>
        <!-- 面包屑：显示当前页面的路径，快速返回之前的任意页面。 -->
        <BreadCrumb></BreadCrumb>
        <div class="cont">
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
import Menu from './common/Menu'
import BreadCrumb from './common/BreadCrumb';
import router from '../router';

export default {
  components:{
      Header : Header,
      Footer : Footer,
      Menu: Menu,
      BreadCrumb:BreadCrumb,
  },
  name: 'Home',
  data () {
    return {
    }
  },
  created(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home .el-aside{
  height: 100%;
}

.home .content{
  position: absolute;
  width: 100%;
  top: 60px;
  bottom: 0;
}

.home .content .cont{
  margin: 20px 0;
}
</style>
