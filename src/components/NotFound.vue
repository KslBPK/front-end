<template>
    <div class="NotFound">
      <h1>{{ msg }}</h1>
      <h1>{{ warning }}</h1>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
    data () {
      return {
        msg: '404',
        warning: '您所访问的页面不存在，请你检查一下页面的路径是否正确！！'
      }
    }
  }
  </script>
  
  
  <style scoped>
  .NotFound h1{
    color: red;
  }
  </style>
  