'use client'
import { LuUser2 } from 'react-icons/lu'
import { useAuth } from '@/lib/hooks/useAuth.hook'
import AuthInput from '@/components/AuthInput'
import { IoMailOutline } from 'react-icons/io5'
import { TbTxt } from 'react-icons/tb'
import { FiUnlock, FiLock } from 'react-icons/fi'
import OTPModel from '@/components/modals/OTPModal'
import { useState } from 'react'

export const SignUpForm = () => {
  const [showModal, setShowModal] = useState(false)
  const {
    errors,
    formSubmitHandler,
    register,
    submitting,
    getValues,
    OTPData,
  } = useAuth({
    type: 'signup',
  })

  return (
    <>
      <OTPModel otp={OTPData} userInp={getValues()} show={showModal} />
      <form
        onSubmit={formSubmitHandler}
        noValidate
        className='my-14 flex flex-col w-full font-ibm items-center gap-5'>
        <AuthInput
          register={register}
          Icon={TbTxt}
          id='fullname'
          label='Full name'
          placeholder='fullname'
          size='text-xl'
          type='text'
          validations={{
            required: 'Looks like you forgot to fill in your name.',
          }}
          errors={errors}
        />

        <AuthInput
          register={register}
          Icon={LuUser2}
          id='username'
          label='Username'
          placeholder='username'
          size='text-xl'
          type='text'
          validations={{
            required: 'You have to type something.',
          }}
          errors={errors}
        />

        <AuthInput
          register={register}
          Icon={IoMailOutline}
          id='emailId'
          label='Email'
          placeholder='email'
          size='text-xl'
          type='email'
          validations={{
            required: 'Please enter your email, we will keep it safe.',
          }}
          errors={errors}
        />

        <AuthInput
          register={register}
          Icon={FiUnlock}
          id='password'
          label='Password'
          placeholder='pasword'
          size='text-xl'
          type='password'
          validations={{
            required: 'You must protect your account',
          }}
          errors={errors}
        />

        <AuthInput
          register={register}
          Icon={FiLock}
          id='confirmPassword'
          label='Confirm Password'
          placeholder='password'
          size='text-xl'
          type='password'
          validations={{
            required: 'You have to type something.',
            validate: {
              isSameAsPass(val) {
                return (
                  val === getValues('password') ||
                  'Looks like somebody else trying to taking over your account.'
                )
              },
            },
          }}
          errors={errors}
        />

        <button
          type='submit'
          disabled={submitting}
          className='self-stretch h-[50px] outline-none rounded-xl bg-primary text-white text-lg mt-7 disabled:bg-gray-400'>
          {submitting ? 'Logging...' : 'SignUp'}
        </button>
        <button
          type='button'
          disabled={submitting}
          onClick={() => setShowModal(true)}
          className='self-stretch h-[50px] outline-none rounded-xl bg-primary text-white text-lg mt-7 disabled:bg-gray-400'>
          {submitting ? 'Logging...' : 'Show OTP MOdal'}
        </button>
      </form>
    </>
  )
}
