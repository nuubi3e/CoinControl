'use client'
import Link from 'next/link'
import { LuUser2 } from 'react-icons/lu'
import { useAuth } from '@/hooks/useAuth.hook'
import AuthInput from '@/components/AuthInput'
import { IoMailOutline } from 'react-icons/io5'
import { TbTxt } from 'react-icons/tb'
import { FiUnlock, FiLock } from 'react-icons/fi'

export const SignUpForm = () => {
  const { error, errors, formSubmitHandler, register, submitting } = useAuth({
    type: 'signup',
  })

  return (
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
          required: 'You have to type something.',
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
          required: 'You have to type something.',
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
          required: 'You have to type something.',
        }}
        errors={errors}
      />

      <AuthInput
        register={register}
        Icon={FiLock}
        id='confirmPass'
        label='Confirm Password'
        placeholder='password'
        size='text-xl'
        type='password'
        validations={{
          required: 'You have to type something.',
        }}
        errors={errors}
      />

      <button
        type='submit'
        disabled={submitting}
        className='self-stretch h-[50px] rounded-xl bg-primary text-white text-lg mt-7 disabled:bg-gray-400'>
        {submitting ? 'Logging...' : 'SignUp'}
      </button>
    </form>
  )
}
