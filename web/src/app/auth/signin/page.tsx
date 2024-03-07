import { Metadata } from 'next'
import AuthFormWrapper from '@/wrappers/AuthFormWrapper'
import { SignInForm } from './form'
import { log } from '@/lib/misc/log'

export const metadata: Metadata = {
  title: 'CoinControl | Login',
  description: 'Kick Start your expense managing journey',
}

export default function SignInPage({
  searchParams,
}: {
  searchParams: { redirect: string }
}) {
  return (
    <AuthFormWrapper redirectUrl='signup'>
      <SignInForm redirectURL={searchParams.redirect || '/'} />
    </AuthFormWrapper>
  )
}
