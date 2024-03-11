'use client'
import Link from 'next/link'
import { GoLock } from 'react-icons/go'
import { LuUser2 } from 'react-icons/lu'
import { useAuth } from '@/lib/hooks/useAuth.hook'
import AuthInput from '@/components/AuthInput'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { TbCheckbox } from 'react-icons/tb'

export const SignInForm = ({ redirectURL }: { redirectURL: string }) => {
  const { errors, formSubmitHandler, register, submitting } = useAuth({
    type: 'signin',
    redirectURL,
  })

  return (
    <form
      onSubmit={formSubmitHandler}
      noValidate
      className='my-14 flex flex-col w-full font-ibm items-center gap-5'>
      <AuthInput
        register={register}
        Icon={LuUser2}
        id='username'
        label='Username / Email'
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
        Icon={GoLock}
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

      <div className='flex w-full justify-between mt-2'>
        <div
          className='flex items-center gap-2 cursor-pointer text-white text-opacity-80 '
          role='button'>
          <input
            type='checkbox'
            id='remember'
            {...register('rememberMe')}
            className='hidden cus-checkbox'
            defaultChecked
          />
          <label
            htmlFor='remember'
            className='flex items-center gap-2 select-none cursor-pointer'>
            <MdCheckBoxOutlineBlank className='text-white text-lg uncheck' />
            <TbCheckbox className='text-white text-lg check' />
            Remember me
          </label>
        </div>

        <Link
          href={'/'}
          className='underline text-white text-opacity-80 block hover:text-opacity-100 transition-all'>
          Forget Password?
        </Link>
      </div>

      <button
        type='submit'
        disabled={submitting}
        className='self-stretch h-[50px] rounded-full bg-primary text-white text-lg mt-4 disabled:bg-gray-400'>
        {submitting ? 'Logging...' : 'Login'}
      </button>
    </form>
  )
}
