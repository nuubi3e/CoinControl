'use client'
import { log } from '@/lib/log'
import { ReactNode } from 'react'

// component to keep track of cookie for manual alternation
const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const cookie = document.cookie
  const authToken = cookie.split('=')[0]

  log(authToken)

  if (authToken && authToken === 'auth-token') {
    document.cookie = `auth-token=aa; expires=${new Date(0)}`
    location.reload()
  }

  return children
}

export default AuthWrapper
