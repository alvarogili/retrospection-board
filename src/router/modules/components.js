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
      path: 'mixin',
      component: () => import('@/views/components-demo/mixin'),
      name: 'ComponentMixinDemo',
      meta: { title: 'componentMixin' }
    },
    {
      path: 'drag-dialog',
      component: () => import('@/views/components-demo/dragDialog'),
      name: 'DragDialogDemo',
      meta: { title: 'dragDialog' }
    },
    {
      path: 'drag-select',
      component: () => import('@/views/components-demo/dragSelect'),
      name: 'DragSelectDemo',
      meta: { title: 'dragSelect' }
    },
    {
      path: 'dnd-list',
      component: () => import('@/views/components-demo/dndList'),
      name: 'DndListDemo',
      meta: { title: 'dndList' }
    },
    {
      path: 'drag-kanban',
      component: () => import('@/views/components-demo/dragKanban'),
      name: 'DragKanbanDemo',
      meta: { title: 'dragKanban' }
    }
  ]
}

export default componentsRouter
