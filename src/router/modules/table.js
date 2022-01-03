/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const userManagerRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/user-manager',
  name: 'User',
  meta: {
    title: '用户',
    icon: 'table'
  },
  children: [
    // {
    //   path: 'dynamic-table',
    //   component: () => import('@/views/table/dynamic-table/index'),
    //   name: 'DynamicTable',
    //   meta: { title: 'Dynamic Table' }
    // },
    // {
    //   path: 'drag-table',
    //   component: () => import('@/views/table/drag-table'),
    //   name: 'DragTable',
    //   meta: { title: 'Drag Table' }
    // },
    // {
    //   path: 'inline-edit-table',
    //   component: () => import('@/views/table/inline-edit-table'),
    //   name: 'InlineEditTable',
    //   meta: { title: 'Inline Edit' }
    // },
    {
      path: 'user-manager',
      component: () => import('@/views/table/user-manager'),
      name: 'UserManager',
      meta: { title: '用户管理' }
    }
  ]
}
export default userManagerRouter
