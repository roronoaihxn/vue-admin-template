/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const fundRouter = {
  path: '/fund',
  component: Layout,
  redirect: 'noRedirect',
  name: '基金',
  meta: {
    title: '基金',
    icon: 'chart'
  },
  children: [
    {
      path: 'history',
      component: () => import('@/views/fund/index'),
      name: 'FundHistoryChart',
      meta: { title: '基金历史净值', noCache: true }
    },
  ]
}

export default fundRouter