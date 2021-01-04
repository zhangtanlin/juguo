import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
  },
  {
    path: '/system',
    name: 'System',
    component: () => import(/* webpackChunkName: "system" */ '@/views/System.vue'),
    children: [
      {
        path: '',
        name: 'Welcome',
        component: () => import(/* webpackChunkName: "system" */ '@/views/Welcome.vue'),
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */ '@/views/User.vue'),
        children: [
          {
            path: '',
            name: 'List',
            component: () => import(/* webpackChunkName: "user" */ '@/views/User/List.vue'),
          },
          {
            path: 'add',
            name: 'Add',
            component: () => import(/* webpackChunkName: "user" */ '@/views/User/Add.vue'),
          },
          {
            path: 'edit/:id',
            name: 'Edit',
            component: () => import(/* webpackChunkName: "user" */ '@/views/User/Edit.vue'),
          },
          {
            path: 'show/:id',
            name: 'Show',
            component: () => import(/* webpackChunkName: "user" */ '@/views/User/Show.vue'),
          },
        ]
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import(/* webpackChunkName: "system" */ '@/views/System/Role.vue'),
      },
      {
        path: 'resource',
        name: 'Resource',
        component: () => import(/* webpackChunkName: "system" */ '@/views/System/Resource.vue'),
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "error" */ '@/views/Error.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: 'bad-not-found',
    component: () => import(/* webpackChunkName: "error" */ '@/views/Error.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
