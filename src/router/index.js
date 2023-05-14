import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/components/Login.vue'
import BoardView from '@/views/BoardView.vue'
import BoardList from '@/components/board/BoardList.vue'
import RegisterBoard from "@/components/board/RegisterBoard.vue";
import NoticeView from "@/views/NoticeView.vue";
import NoticeList from "@/components/notice/NoticeList.vue";
import List from "@/components/notice/list/List.vue";
import DetailNotice from "@/components/notice/DetailNotice.vue";
import RegisterNotice from "@/components/notice/RegisterNotice.vue";
import EditNotice from "@/components/notice/EditNotice.vue";

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
  },
  {
    path: '/notices',
    component: NoticeView,
    children: [
      {
        path: '',
        name: "noticeList",
        component: NoticeList,
        children: [
          {
            path: '',
            component: List,
          }
        ]
      },
      {
        path: 'register',
        name: 'registerNotice',
        component: RegisterNotice,
      },
      {
        path: ':noticeId',
        name: 'detailNotice',
        component: DetailNotice,
      },
      {
        path: ':noticeId/edit',
        name: 'editNotice',
        component: EditNotice,
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
