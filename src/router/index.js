import Vue from 'vue';
import VueRouter from 'vue-router';
import Epub from '../Epub.vue';
// import About from '../views/About.vue';
// import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/',
    component: Epub,
  },
  // {
  //   path: '/about',
  //   component: About,
  // }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
