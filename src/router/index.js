import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import closeSideMenu from './middleware/closeSideMenu'
import yametrika from './middleware/yametrika'
import store from '@/store'
import middlewarePipeline from '@/_core/router/middlewarePipeline'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
  },
  {
    path: '/:notFound(.*)',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "notFound" */ '@/views/NotFound'),
    meta: {
      title: '404'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from) {
    if (to.name !== from.name) document.getElementById('app').scrollIntoView()
  }
})

const DEFAULT_TITLE = 'arigami-pwa'
const DEFAULT_DESCRIPTION = 'arigami-pwa'
router.afterEach((to, from) => {
  nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE
    document.querySelector('meta[name="description"]').setAttribute('content', to.meta.description || DEFAULT_DESCRIPTION)
  })
})

router.beforeEach((to, from, next) => {
  let middleware = [closeSideMenu, yametrika]
  if (to.meta.middleware) middleware = middleware.concat(Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware])
  if (!middleware.length) return next()

  const context = {
    to,
    from,
    next,
    store
  }

  return middleware[0]({
    ...context,
    nextMiddleware: middlewarePipeline(context, middleware, 1)
  })
})

export default router
