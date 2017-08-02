import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: require('@/components/HomePage')
    },
    {
      path: '/landing',
      name: 'landing-page',
      component: require('@/components/LandingPage')
    },
    {
      path: '/import',
      name: 'import-page',
      component: require('@/components/ImportPage')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
