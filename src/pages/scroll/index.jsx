import React from 'react'
import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'

export default function scroll() {
  return (
        <UserLayout>
    
          <DashboardLayout>
          <div>
            <h2>scroll</h2>
          </div>
          </DashboardLayout>
          </UserLayout>
  )
}
