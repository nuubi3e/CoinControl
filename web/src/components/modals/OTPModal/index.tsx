'use client'
import { OTPInfo } from '@/lib/types/client.types'
import { useRouter } from 'next/navigation'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import toast from 'react-hot-toast'
import { motion as m } from 'framer-motion'
import { LuLoader2 } from 'react-icons/lu'
import { connectToAPI, encodeEmail } from '@/lib/util.client'
import { log } from '@/lib/log'

interface OTPModelProps {
  otp: OTPInfo
  userInp: any
  show: boolean
}

const RESENT_OTP_TIME = 45
let interval: NodeJS.Timeout

const OTPModel: FC<OTPModelProps> = ({ otp, userInp, show }) => {
  const [verifyingOTP, setVerifyingOTP] = useState(false)
  const [retryCount, setRetryCount] = useState(2) // user can resend otp only 2 times
  const modalRef = useRef<HTMLElement | null>(null)
  const [authKey, setAuthKey] = useState(otp.key)
  const router = useRouter()
  const [OTP, setOTP] = useState(Array.from({ length: 6 }).map(() => ''))

  const verifyOTP = async () => {
    setVerifyingOTP(true)
    const isValid = !isNaN(+OTP.join('')) && OTP.join('').length === 6
    log(OTP)
    try {
      if (!isValid) throw new Error('Please Enter proper OTP')

      log(+OTP.join(''))

      const data = await connectToAPI({
        endpoint: 'auth/signup',
        method: 'PUT',
        extraHeaders: { Authorization: authKey || otp.key },
        payload: JSON.stringify({ otp: +OTP.join('') }),
      })

      log(data)

      toast.success('Registeration Successful, Please Login.')

      // pushing to login after successful verification.
      router.push('/signin')
    } catch (err: any) {
      console.error(err)
      setOTP(['', '', '', '', '', ''])
      toast.error(err.message)
    } finally {
      setVerifyingOTP(false)
    }
  }

  const pasteHandler = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const copiedOTP = e.clipboardData.getData('text')

    if (isNaN(+copiedOTP) || copiedOTP.length !== 6) return

    setOTP(copiedOTP.split(''))
    verifyOTP()
  }

  useEffect(() => {
    modalRef.current = document.getElementById('modals') as HTMLElement
  }, [])

  const resendOTP = async () => {
    try {
      const data = await connectToAPI({
        endpoint: 'auth/signup',
        method: 'POST',
        payload: JSON.stringify({ ...userInp }),
      })

      setAuthKey(data.data.key)

      toast.success('New OTP Sent Successfully.')
    } catch (err) {
      console.error(err)
      toast.success('Something went wrong.')
    }
  }

  return otp.showScreen && modalRef.current
    ? createPortal(
        <div className='z-[1000] w-[100dvw] h-[100dvh] bg-black fixed right-0 bottom-0 bg-opacity-40 backdrop-blur-[4px] p-5 pt-10 max-[450px]:pt-0'>
          <m.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className='shadow-lg rounded-lg p-14 bg-white w-[600px] font-ibm flex items-center flex-col mx-auto max-[610px]:p-10 max-[610px]:w-full max-[450px]:p-5 text-center max-[350px]:p-2'>
            <div className='flex flex-col items-center gap-4 max-[450px]:gap-2 max-[350px]:gap-1'>
              <h2 className='text-3xl font-bold max-[450px]:text-xl'>
                OTP Verification
              </h2>
              <p className='flex flex-col items-center text-gray-600 text-sm'>
                Please Enter the verification we sent on{' '}
                <strong className='text-gray-900 font-semibold'>
                  {encodeEmail(otp.email)}
                </strong>{' '}
              </p>
            </div>

            <p className='self-start mt-10 mb-2 text-sm text-gray-600'>
              Type 6 digit OTP
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                verifyOTP()
              }}
              className='flex flex-col gap-5'>
              <div className='w-full flex gap-2 max-[350px]:gap-1'>
                {OTP.map((el, i) => (
                  <div
                    className='flex-1 aspect-square max-[450px]:aspect-[1/1.2] max-[350px]:aspect-[1/1.5]'
                    key={i}>
                    <input
                      type='text'
                      id={`otp-${i}`}
                      maxLength={1}
                      onPaste={pasteHandler}
                      onKeyUp={(e) => {
                        if (e.key !== 'Backspace') return

                        const val = (e.target as HTMLInputElement).value
                        val.length !== 1 &&
                          document.getElementById(`otp-${i - 1}`)?.focus()

                        setOTP((otp) => {
                          otp[i] = ''

                          return otp
                        })
                      }}
                      onChange={(e) => {
                        if (isNaN(+e.target.value)) return (e.target.value = '')

                        if (e.target.value.length === 1)
                          document.getElementById(`otp-${i + 1}`)?.focus()

                        setOTP((otp) => {
                          otp[i] = e.target.value

                          return otp
                        })

                        if (i === 5 && e.target.value.length === 1) verifyOTP()
                      }}
                      defaultValue={OTP[i]}
                      inputMode='numeric'
                      className='text-center w-full h-full text-2xl outline-none bg-gray-100 rounded-lg'
                    />
                  </div>
                ))}
              </div>
              {otp.showScreen && retryCount > 0 && (
                <OTPTimer
                  resendOTP={resendOTP}
                  reduceRetryCount={() => setRetryCount((lst) => lst - 1)}
                />
              )}

              <button
                type='submit'
                disabled={verifyingOTP}
                className='flex justify-center items-center transition-all w-full h-[40px] bg-gray-950 text-white uppercase font-medium rounded-md disabled:bg-gray-400 disabled:text-gray-100'>
                {verifyingOTP ? (
                  <LuLoader2 className='animate-spin text-2xl' />
                ) : (
                  'verify'
                )}
              </button>
            </form>
          </m.div>
        </div>,
        document.getElementById('modals') as HTMLElement
      )
    : null
}

export default OTPModel

const OTPTimer = ({
  resendOTP,
  reduceRetryCount,
}: {
  resendOTP: () => void
  reduceRetryCount: () => void
}) => {
  const [otpTimer, setOtpTimer] = useState(RESENT_OTP_TIME)
  const [showResend, setShowResend] = useState(false)

  useEffect(() => {
    if (showResend) return

    if (otpTimer <= 0) {
      clearInterval(interval)
      setShowResend(true)
      return
    }

    clearInterval(interval)
    interval = setInterval(() => {
      setOtpTimer((lst) => lst - 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [otpTimer, showResend])

  return (
    <div className='flex justify-end'>
      {showResend && (
        <button
          type='button'
          onClick={() => {
            resendOTP()
            reduceRetryCount()
            setShowResend(false)
            setOtpTimer(RESENT_OTP_TIME)
          }}
          className='bg-violet-500 font-medium px-3 py-1 text-violet-50 rounded text-sm hover:bg-violet-600'>
          Resend OTP
        </button>
      )}
      {!showResend && (
        <p className='text-gray-400 font-medium text-sm'>
          Resend in {otpTimer} seconds
        </p>
      )}
    </div>
  )
}
