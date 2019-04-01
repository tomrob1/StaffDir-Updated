import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//Pages
import Home from '@/components/Home'
import Search from '@/components/Search'
import SearchResult from '@/components/SearchResult'
import AshtonMap from '@/components/AshtonMap'
import HoltMap from '@/components/HoltMap'
import Test from '@/components/Test'
import Board from '@/components/Board'

Vue.use(Router)
Vue.use(BootstrapVue)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/searchresult',
      name: 'searchresult',
      component: SearchResult
    },
    {
      path: '/ashtonmap',
      name: 'ashtonmap',
      component: AshtonMap
    },
    {
      path: '/holtmap',
      name: 'holtmap',
      component: HoltMap
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/board',
      name: 'board',
      component: Board
    }
  ]
})
