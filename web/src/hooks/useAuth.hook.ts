import { OTPInfo } from '@/lib/types/client.types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface AuthHookProps {
  type: 'signin' | 'signup'
}

export function useAuth({ type }: AuthHookProps) {
  const [submitting, setSubmitting] = useState(false)
  const [OTPData, setOTPData] = useState<OTPInfo>({
    showScreen: false,
    key: '',
    email: '',
  })
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm()

  const router = useRouter()

  const authHandler = async (userInp: any) => {
    setSubmitting(true)
    try {
      console.log('I am here')
      const res = await fetch(`/api/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInp),
      })

      if (!res.ok) {
        const error = JSON.parse(await res.text())

        throw new Error(error.message)
      }

      const data = await res.json()

      console.log(data)
      // if this hook is going to use in login page then we return and push the user to home page
      if (type === 'signin') return router.push('/')

      // If type is signup
      // we create a Object contains data to show otp screen and payload to verify otp
      setOTPData({
        email: userInp.emailId as string,
        key: data.data.key,
        showScreen: true,
      })
    } catch (err: any) {
      console.error(err)
      toast.error(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  // function to handle form submition
  const formSubmitHandler = handleSubmit(authHandler)

  return {
    register,
    errors,
    formSubmitHandler,
    submitting,
    getValues,
    OTPData,
  }
}
