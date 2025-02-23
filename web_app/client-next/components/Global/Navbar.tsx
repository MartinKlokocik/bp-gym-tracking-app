'use client'

import {
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  NavbarBrand,
  NavbarContent,
  Navbar as NavbarHeroui,
  NavbarItem,
  User,
  DropdownMenu,
} from '@heroui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const activeItem = pathname?.split('/').pop()
  const { data: session, status } = useSession()

  const handleLogout = () => {
    signOut()
  }

  return (
    <NavbarHeroui
      maxWidth="full"
      isBlurred={false}
      classNames={{
        item: [
          'flex',
          'relative',
          'h-full',
          'items-center',
          "data-[active=true]:after:content-['']",
          'data-[active=true]:after:absolute',
          'data-[active=true]:after:bottom-0',
          'data-[active=true]:after:left-0',
          'data-[active=true]:after:right-0',
          'data-[active=true]:after:h-[2px]',
          'data-[active=true]:after:rounded-[2px]',
          'data-[active=true]:after:bg-primary',
        ],
      }}
    >
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      {session && status === 'authenticated' && (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={activeItem === 'dashboard'}>
            <Link color="foreground" href="/dashboard">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem isActive={activeItem === 'workout_section'}>
            <Link aria-current="page" href="/workout_section">
              Workouts section
            </Link>
          </NavbarItem>
          <NavbarItem isActive={activeItem === 'food_section'}>
            <Link color="foreground" href="/food_section">
              Food section
            </Link>
          </NavbarItem>
          <NavbarItem isActive={activeItem === 'community_section'}>
            <Link color="foreground" href="/community_section">
              Community section
            </Link>
          </NavbarItem>
        </NavbarContent>
      )}
      <NavbarContent justify="end">
        {!session ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/auth/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="/auth/signup"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem className="mt-2">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                  }}
                  className="transition-transform"
                  description={session?.user?.email}
                  name={session?.user?.name}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile">Profile</DropdownItem>
                <DropdownItem key="settings">Settings</DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onPress={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        )}
      </NavbarContent>
    </NavbarHeroui>
  )
}
