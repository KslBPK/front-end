<template>
  <div class="home">
    <Header></Header>
    <el-container class="content">
      <div>菜单</div>
      <el-main>
        <div>
          <!-- 路由出口（没有这个东西看不到界面） -->
          <!-- <router-view></router-view> -->
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
