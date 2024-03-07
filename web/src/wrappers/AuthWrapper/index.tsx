'use client'
import { log } from '@/lib/misc/log'
import { ReactNode } from 'react'

/*
- IF some person changes the httponly cookie from the browser then that will become normal cookie and become accessible using client JS so we check for that if that will be the case then we will expire that cookie and reloads the page.
- Component to keep track of cookie for manual alternation
*/
const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const cookie = document.cookie
  const authToken = cookie.split('=')[0]

  if (authToken && authToken === 'auth-token') {
    document.cookie = `auth-token=aa; expires=${new Date(0)}`
    location.reload()
  }

  return children
}

export default AuthWrapper
