<template>
  <div class="home">
    <Header></Header>
    <el-container class="content">
      <div>菜单</div>
      <el-main>
        <div>主要内容区</div>
        <Footer></Footer>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from './common/Header'
import Footer from './common/Footer'
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
