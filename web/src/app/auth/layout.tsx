import { getSession } from '@/lib/misc/auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default function AuthLayoutPage({ children }: { children: ReactNode }) {
  const session = getSession()

  if (session) return redirect('/')

  return children
}
