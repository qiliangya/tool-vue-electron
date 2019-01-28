<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'vue-window'
  }
</script>

<style lang="scss">
  /* CSS */
  @import './public/style/reset.css';
  @import './public/style/public.scss';
  #app{
    width:100%;
    height:100%;
  }
</style>
