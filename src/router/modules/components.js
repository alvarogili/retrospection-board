/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noredirect',
  name: 'ComponentDemo',
  meta: {
    title: 'components',
    icon: 'component'
  },
  children: [
    {
      path: 'retroBoard',
      component: () => import('@/views/components-demo/retroBoard'),
      name: 'retroBoardDemo',
      meta: { title: 'retroBoard' }
    }

  ]
}

export default componentsRouter
