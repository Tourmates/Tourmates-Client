import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/components/Login.vue'
import BoardView from '@/views/BoardView.vue'
import BoardList from '@/components/board/BoardList.vue'
import RegisterBoard from "@/components/board/RegisterBoard.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/boards',
    component: BoardView,
    children: [
      {
        path: '',
        name: 'boardList',
        component: BoardList,
      },
      {
        path: 'register',
        name: 'registerBoard',
        component: RegisterBoard,
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
