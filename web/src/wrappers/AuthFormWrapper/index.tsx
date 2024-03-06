import Image from 'next/image'
import Link from 'next/link'
import React, { FC, ReactNode } from 'react'
import BGImg from '@/assets/background.jpg'
import Logo from '@/assets/logo.svg'

interface AuthFormWrapperProps {
  children: ReactNode
  redirectUrl: 'signin' | 'signup'
}

const AuthFormWrapper: FC<AuthFormWrapperProps> = ({
  children,
  redirectUrl,
}) => {
  return (
    <main className='min-h-[100dvh] relative flex flex-col p-5 justify-center gap-5 items-center font-ibm'>
      <Image
        src={BGImg}
        width={1920}
        height={1024}
        alt='gradient background'
        className='w-full h-full absolute top-0 left-0 z-[-1] object-cover object-center'
      />
      <div className='signin__box'>
        <div className='flex items-center gap-4 flex-row-reverse'>
          <h1 className='text-center text-2xl uppercase font-orb text-white'>
            {redirectUrl === 'signin' ? 'Register' : 'Login'}
          </h1>
          <div className='self-stretch w-[2px] bg-white' />
          <Image
            src={Logo}
            width={120}
            height={100}
            alt='CoinControl Logo'
            className='invert'
          />
        </div>

        {children}

        <p className='text-white'>
          {redirectUrl === 'signin' ? 'Already Join Us' : 'New Here'}?{' '}
          <Link href={`/${redirectUrl}`} className='underline'>
            {redirectUrl === 'signin' ? 'Login' : 'Create New Account'}
          </Link>
        </p>
      </div>
    </main>
  )
}

export default AuthFormWrapper
