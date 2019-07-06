
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/add-order', component: () => import('pages/addOrder.vue') },
      { path: '/edit-order', component: () => import('pages/editOrder.vue') },
      { path: '/senders', component: () => import('pages/Senders.vue') },
      { path: '/add-sender', component: () => import('pages/addSender.vue') },
      { path: '/income', component: () => import('pages/Income.vue') },
      { path: '/edit-sender', component: () => import('pages/editSender.vue') },
      { path: '/invoice', component: () => import('pages/Invoice.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
