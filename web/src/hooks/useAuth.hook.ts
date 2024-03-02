import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
interface AuthHookProps {
  type: 'signin' | 'signup'
}

export const useAuth = ({ type }: AuthHookProps) => {
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm()
  const router = useRouter()

  const authHandler = async (userInp: any) => {
    setSubmitting(true)
    setError('')
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
      // router.push(type === 'signin' ? '/' : '/signin')
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const formSubmitHandler = handleSubmit(authHandler)

  return { register, errors, error, formSubmitHandler, submitting, getValues }
}
