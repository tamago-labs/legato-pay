// import { Inter } from 'next/font/google'
import './globals.css'

import Footer from '@/components/Footer'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LetPay',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body  >
        <main
          className={`  bg-neutral-100 text-black flex h-screen flex-col mx-auto justify-between`}
        > 
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
