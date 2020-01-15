import Vue from 'vue'
import VueRouter from 'vue-router'

const Main = () => import("@/views/Main.vue");
const LeaveMessageModule = () => import("@/components/pages/leave-message/index.vue")
const ArticleInfoModule = () => import("@/components/pages/article-info/index.vue")
const DashboardModule = () => import("@/components/pages/dashboard-manage/index.vue")
const SearchModule = () => import("@/components/pages/search-manage/index.vue")
const FriednlyLinkModule = () => import("@/components/pages/links/index.vue")
const AboutModule = () => import("@/components/pages/about/index.vue")
const TypeModule = () => import("@/components/pages/type-article/index.vue")
const NotFoundModule = () => import("@/components/pages/404.vue")
const GithubLogin = () => import("@/components/GithubSingn.vue")
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    redirect: '/app',
    children: [
      {
        path: '/app',
        component: DashboardModule,
      },
      {
        path: '/leave_message',
        component: LeaveMessageModule,
      },
      {
        path: '/article/:id',
        component: ArticleInfoModule,
      },
      {
        path: '/search/:key',
        component: SearchModule,
      },
      {
        path: '/type/:type',
        component: TypeModule
      },
      {
        path: '/links',
        component: FriednlyLinkModule
      },
      {
        path: '/about',
        component: AboutModule
      },
      {
        path: '/signin_github',
        component: GithubLogin
      },
      {
        path: '/404',
        component: NotFoundModule,
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
