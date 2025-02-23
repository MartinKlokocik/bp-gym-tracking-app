'use client'

import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import { HeroUIProvider } from '@heroui/react'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer, Bounce } from 'react-toastify'

import Navbar from '@/components/Global/Navbar'
import client from '@/lib/apollo'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={'antialiased dark text-foreground bg-background h-full'}>
        <SessionProvider>
          <ApolloProvider client={client}>
            <HeroUIProvider>
              <Navbar></Navbar>
              <div className="h-full">{children}</div>
              <ToastContainer
                position="bottom-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
              />
            </HeroUIProvider>
          </ApolloProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
