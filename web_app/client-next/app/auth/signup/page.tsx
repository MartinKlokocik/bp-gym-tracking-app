'use client'

import { Button, Input } from '@heroui/react'
import { Eye, EyeOff, UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const { status } = useSession()
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [error, setError] = useState('')

  const toggleVisibility = () => setIsVisible(!isVisible)

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [status, router])

  if (status === 'loading') return <p>Loading...</p>

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string

    const signupResponse = await fetch('http://localhost:4000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation Signup($email: String!, $password: String!, $name: String!) {
            signup(email: $email, password: $password, name: $name) {
              id
              email
              name
            }
          }
        `,
        variables: { email, password, name },
      }),
    })

    const signupResult = await signupResponse.json()

    if (signupResult?.data?.signup) {
      const signInResult = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (signInResult?.error) {
        setError('Signup failed.')
      } else {
        router.push('/dashboard')
      }
    } else {
      setError('Signup failed.')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto mt-20">
      <div className="shadow-lg rounded-lg p-8 border border-zinc-700 bg-zinc-800">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-zinc-100">Create Account</h2>
          <p className="text-zinc-400 mt-1">Sign up to get started</p>
        </div>

        <form onSubmit={handleSignup}>
          <Input
            label="Name"
            placeholder="Enter your name"
            type="text"
            variant="bordered"
            className="w-full mb-2"
            required
            name="name"
          />

          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
            className="w-full mb-2"
            required
            name="email"
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            type={isVisible ? 'text' : 'password'}
            variant="bordered"
            className="w-full mb-2"
            required
            name="password"
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeOff className="text-zinc-400" />
                ) : (
                  <Eye className="text-zinc-400" />
                )}
              </button>
            }
          />

          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            type={isVisible ? 'text' : 'password'}
            variant="bordered"
            className="w-full mb-6"
            required
            name="confirmPassword"
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeOff className="text-zinc-400" />
                ) : (
                  <Eye className="text-zinc-400" />
                )}
              </button>
            }
          />

          <Button
            type="submit"
            variant="solid"
            color="primary"
            className="w-full"
            startContent={<UserPlus size={20} />}
          >
            Sign up
          </Button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className="font-medium text-primary-400 hover:text-primary-300"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  )
}
