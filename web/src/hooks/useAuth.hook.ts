import { OTPInfo } from '@/lib/types/client.types'
import { connectToAPI } from '@/lib/util.client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface AuthHookProps {
  type: 'signin' | 'signup'
  redirectURL?: string
}

export function useAuth({ type, redirectURL }: AuthHookProps) {
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
      const data = await connectToAPI({
        endpoint: `auth/${type}`,
        payload: JSON.stringify(userInp),
        method: 'POST',
      })

      // if this hook is going to use in login page then we return and push the user to home page
      if (type === 'signin') {
        toast.success(data.message)
        return router.push(redirectURL || '/')
      }

      // If type is signup
      // we create a Object contains data to show otp screen and payload to verify otp
      setOTPData({
        email: userInp.emailId as string,
        key: data.data.key,
        showScreen: true,
      })
    } catch (err: any) {
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
