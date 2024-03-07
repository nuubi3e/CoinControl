import { getSession } from '@/lib/auth'

export default async function HomePage() {
  const session = await getSession()

  return (
    <h1 className='text-center text-3xl capitalize mt-10 font-semibold font-ibm'>
      Welcome {session?.name}
    </h1>
  )
}
