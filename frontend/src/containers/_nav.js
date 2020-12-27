import React from 'react'
import CIcon from '@coreui/icons-react'

export default [
  // Dashboard
  {
    _tag: 'CSidebarNavItem',
    name: 'Trang chủ',
    to: '/',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: 'info',
    }
  },
]

