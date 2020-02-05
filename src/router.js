import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForumCreate from './pages/ForumCreate'
import Forum from './pages/Forum'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/forums/create',
      name: 'forums/create',
      component: ForumCreate
    },
    {
      path: '/forums/:id',
      name: 'forums',
      component: Forum
    },
  ]
})