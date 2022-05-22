<template>
  <div id="app">
    <!-- <input disabled> -->
    <!-- <div id="nav"> -->
      <!-- <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> | -->
      <!-- <router-link to="/ebook">ebook</router-link> -->
    <!-- </div> -->
    <!-- router-view组件作为vue最核心的路由管理组件，
    在项目中作为路由管理经常被使用到。
    vue项目最核心的App.vue文件中即是通过router-view进行路由管理 -->
    <router-view />
  </div>
</template>

<script>
import './style/reset.scss';
// import './style/global.scss';
export default {

};
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html');
  let fontSize = window.innerWidth / 10;
  fontSize = fontSize > 50 ? 50 : fontSize;
  html.style.fontSize = fontSize + 'px';
});
</script>

<style></style>
