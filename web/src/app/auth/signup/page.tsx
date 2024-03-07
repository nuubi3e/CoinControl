import { Metadata } from 'next'
import AuthFormWrapper from '@/wrappers/AuthFormWrapper'
import { SignUpForm } from './form'

export const metadata: Metadata = {
  title: 'CoinControl | New Account',
  description: 'Join us to kick start your expense management journey',
}

export default function SignUpPage() {
  return (
    <AuthFormWrapper redirectUrl='signin'>
      <SignUpForm />
    </AuthFormWrapper>
  )
}
