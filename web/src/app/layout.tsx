import { Orbitron, IBM_Plex_Sans } from 'next/font/google'
import './globals.scss'
import type { Metadata } from 'next'
import ToastContainer from '@/components/ToastContainer'
import ReduxProvider from '@/lib/store/Provider'
import AuthChecker from '@/components/AuthChecker'
import LeftNavbar from '@/components/LeftNavbar'

// FONT VARIABLES
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-orbitron',
})

const ibm_plex_sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-ibm',
})

export const metadata: Metadata = {
  title: 'CoinControl | Empowering Your Financial Freedom',
  description:
    'CoinControl is a one stop solution to effortlessly track, manage, and optimize your expenses for financial freedom.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      className={`${orbitron.variable} ${ibm_plex_sans.variable}`}>
      <body>
        <ToastContainer />
        <AuthChecker />
        <section id='modals'></section>
        <ReduxProvider>
          {/* <div className='w-[100dvw] h-[100dvh] flex overflow-hidden bg-[#111]'> */}
          {/* <LeftNavbar /> */}
          {/* <main className='flex-1 overflow-y-scroll cus_scroll'> */}
          {children}
          {/* </main> */}
          {/* </div> */}
        </ReduxProvider>
      </body>
    </html>
  )
}
