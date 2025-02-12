'use client'

import localFont from 'next/font/local'
import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import client from '@/lib/apollo'
import Navbar from '@/components/Global/Navbar'
import { HeroUIProvider } from '@heroui/react'

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark text-foreground bg-background h-full`}
      >
        <ApolloProvider client={client}>
          <HeroUIProvider>
            <Navbar></Navbar>
            <div className="h-full">{children}</div>
          </HeroUIProvider>
        </ApolloProvider>
      </body>
    </html>
  )
}
