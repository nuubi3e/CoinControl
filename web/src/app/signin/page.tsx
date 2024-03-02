import { Metadata } from 'next'
import AuthFormWrapper from '@/wrappers/AuthFormWrapper'
import { SignInForm } from './form'

export const metadata: Metadata = {
  title: 'CoinControl | Login',
  description: 'Kick Start your expense managing journey',
}

export default function SignInPage() {
  return (
    <AuthFormWrapper redirectUrl='signup'>
      <SignInForm />
    </AuthFormWrapper>
  )
}
