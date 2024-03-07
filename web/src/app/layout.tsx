import { Orbitron, IBM_Plex_Sans } from 'next/font/google'
import './globals.scss'
import type { Metadata } from 'next'
import ToastContainer from '@/components/ToastContainer'
import dynamic from 'next/dynamic'
import ReduxProvider from '@/lib/store/Provider'
const AuthWrapper = dynamic(() => import('@/wrappers/AuthWrapper'), {
  ssr: false,
})

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
        <section id='modals'></section>
        <ReduxProvider>
          <AuthWrapper>{children}</AuthWrapper>
        </ReduxProvider>
      </body>
    </html>
  )
}
