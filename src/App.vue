<template>
  <div id="app">
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  @import './assets/stylesheets/animation.scss';
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
