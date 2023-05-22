import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/components/Login.vue'
import BoardView from '@/views/BoardView.vue'
import Boards from '@/components/board/Boards.vue'
import RegisterBoard from "@/components/board/RegisterBoard.vue";
import RegisterBoardComment from "@/components/board/DetailBoard.vue";
import NoticeView from "@/views/NoticeView.vue";
import NoticeList from "@/components/notice/NoticeList.vue";
import BoardList from "@/components/board/list/BoardList.vue";
import List from "@/components/notice/list/List.vue";
import DetailNotice from "@/components/notice/DetailNotice.vue";
import DetailBoard from "@/components/board/DetailBoard.vue";
import EditBoard from "@/components/board/EditBoard.vue";
import Comments from "@/components/board/DetailBoard.vue";
import Join from "@/components/Join.vue";
import QnaView from "@/views/QnaView.vue";
import QnaList from "@/components/qna/QnaList.vue";
import QnaList2 from "@/components/qna/list/List.vue";
import DetailQna from "@/components/qna/DetailQna.vue";
import RegisterQna from "@/components/qna/RegisterQna.vue";
import HotPlaceView from "@/views/HotPlaceView.vue";
import RegisterHotPlace from "@/components/hotplace/RegisterHotPlace.vue";
import HotPlaces from "@/components/hotplace/HotPlaces.vue";
import HotPlaceList from "@/components/hotplace/list/HotPlaceList.vue";
import MyPage from "@/components/member/MyPage.vue";
import MyPageView from "@/views/MyPageView.vue";
import EditPersonalInfo from "@/components/member/EditMyPersonal.vue";
import EditLoginPw from "@/components/member/EditLoginPw.vue";
import AttractionView from "@/views/AttractionView.vue";
import KakaoMap from "@/components/attraction/KakaoMap.vue";
import MyBoards from "@/components/member/MyBoards.vue";
import DetailHotPlace from "@/components/hotplace/DetailHotPlace.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/attractions',
    name: 'AttractionView',
    component: AttractionView,
    children: [
      {
        path: '',
        name: 'KakaoMap',
        component: KakaoMap,
      }
    ]
  },
  {
    path: '/my',
    name: 'MyPageView',
    component: MyPageView,
    children: [
      {
        path: '',
        name: "Mypage",
        component: MyPage,
      },
      {
        path: 'personal',
        name: 'EditPersonalInfo',
        component: EditPersonalInfo
      },
      {
        path: 'account',
        name: 'EditLoginPw',
        component: EditLoginPw
      },
      {
        path: 'boards',
        name: 'MyBoards',
        component: MyBoards
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/join',
    name: 'join',
    component: Join,
  },
  {
    path: '/boards',
    component: BoardView,
    children: [
      {
        path: '',
        name: 'boardList',
        component: Boards,
        children: [
          {
            path: '',
            component: BoardList,
          }
        ]
      },
      {
        path: ':boardId/comments/list',
        name: 'commentList',
        component: Comments
      },
      {
        path: 'register',
        name: 'registerBoard',
        component: RegisterBoard,
      },
      {
        path: ':boardId',
        name: 'detailBoard',
        component: DetailBoard
      },
      {
        path: ':boardId/comments/register',
        name: 'registerBoardComment',
        component: RegisterBoardComment,
      },
      {
        path: ':boardId/edit',
        name: "editBoard",
        component: EditBoard,
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
        path: ':noticeId',
        name: 'detailNotice',
        component: DetailNotice,
      },
    ]
  },
  {
    path: '/qna',
    component: QnaView,
    children: [
      {
        path: '',
        name: 'qnaList',
        component: QnaList,
        children: [
          {
            path: '',
            component: QnaList2,
          }
        ]
      },
      {
        path: ':questionId',
        name: 'detailQna',
        component: DetailQna,
      },
      {
        path: 'register',
        name: 'registerQna',
        component: RegisterQna,
      },
    ]
  },
  {
    path: '/hotPlaces',
    component: HotPlaceView,
    children: [
      {
        path: '',
        name: 'hotPlaces',
        component: HotPlaces,
        children: [
          {
            path: '',
            component: HotPlaceList,
          }
        ]
      },
      {
        path: 'register',
        name: 'registerHotPlace',
        component: RegisterHotPlace,
      },
      {
        path: ':hotPlaceId',
        name: 'detailHotPlace',
        component: DetailHotPlace,
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
