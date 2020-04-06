import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Mobile from '../views/Mobile.vue'
import { isMobile } from 'mobile-device-detect';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mobile',
    name: 'Mobile',
    component: Mobile
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(!isMobile) next();
  else {
    to.name == "Mobile" ? next() : next({ path: '/mobile'});
  }
})

export default router
