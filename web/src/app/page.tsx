import { getSession } from '@/lib/util.server'
import { redirect } from 'next/navigation'

export default function HomePage() {
  const session = getSession()

  if (!session) return redirect('/signin')

  return (
    <h1 className='text-center text-3xl capitalize mt-10 font-semibold font-ibm'>
      Welcome {session.name}
    </h1>
  )
}
