'use client'

import { Button, Checkbox, Input } from '@heroui/react'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LoginPage() {
  const { status } = useSession()
  const router = useRouter()
  const [error, setError] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [status, router])

  if (status === 'loading') return <p>Loading...</p>

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (result?.error) {
      setError('Invalid credentials')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto mt-20">
      <div className="shadow-lg rounded-lg p-8 border border-zinc-700 bg-zinc-800">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-zinc-100">Welcome Back</h2>
          <p className="text-zinc-400 mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
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
            className="w-full mb-2"
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
            label="Password"
            placeholder="Enter your password"
            type={isVisible ? 'text' : 'password'}
            variant="bordered"
            required
            name="password"
          />

          <div className="flex items-center justify-between mb-6">
            <Checkbox size="sm" defaultSelected={true} color="primary">
              Remember me
            </Checkbox>
            <Link
              href="/auth/forgot-password"
              className="font-medium text-primary-400 hover:text-primary-300"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="solid"
            color="primary"
            className="w-full"
            startContent={<LogIn size={20} />}
          >
            Sign in
          </Button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Don&apos;t have an account?{' '}
          <Link
            href="/auth/signup"
            className="font-medium text-primary-400 hover:text-primary-300"
          >
            Create one here
          </Link>
        </p>
      </div>
    </div>
  )
}
