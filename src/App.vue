<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  @import './assets/stylesheets/common.scss';
  * {
    outline: none;
  }
  body {
    background-image: url('./assets/images/background.png');
    background-attachment: fixed;
    background-size: cover;
    padding-top: 40px;
  }
  #app {
    font-family: 'Lato', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
