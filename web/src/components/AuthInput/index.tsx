'use client'
import React, { FC, HTMLInputTypeAttribute, useState } from 'react'
import { IoMdEye, IoIosEyeOff } from 'react-icons/io'
import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form'
import { IconType } from 'react-icons'

interface AuthInputProps {
  type: HTMLInputTypeAttribute
  autoComplete?: boolean
  placeholder: string
  id: string
  register: UseFormRegister<FieldValues>
  Icon: IconType
  size: string
  label: string
  validations?: RegisterOptions
  errors: FieldErrors<FieldValues>
}

const AuthInput: FC<AuthInputProps> = ({
  Icon,
  register,
  size,
  label,
  autoComplete,
  validations,
  type,
  errors,
  ...props
}) => {
  const [showPass, setShowPass] = useState(false)

  return (
    <div className='flex flex-col w-full'>
      <div className='signin__input_box'>
        <input
          className='signin__input'
          autoComplete={autoComplete ? 'on' : 'off'}
          // Toggling type in case of password
          type={type === 'password' ? (showPass ? 'text' : 'password') : type}
          {...props}
          {...register(props.id, validations)}
        />
        <p className='signin__icon'>
          <Icon className={size} />
        </p>
        <label htmlFor={props.id} className='signin__label'>
          {label}
        </label>

        {/* Showing eye in case of password */}
        {type === 'password' && (
          <p
            onClick={() => setShowPass((lst) => !lst)}
            className='signin__icon absolute right-0 border-none'
            role='button'>
            {showPass ? <IoMdEye /> : <IoIosEyeOff />}
          </p>
        )}
      </div>

      {/* error while typing */}
      {errors[props.id] && (
        <p className='text-sm text-white mt-2'>
          {errors[props.id]?.message as string}
        </p>
      )}
    </div>
  )
}

export default AuthInput
