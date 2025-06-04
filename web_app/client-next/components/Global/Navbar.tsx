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
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@heroui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

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
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    signOut()
  }

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      isActive: activeItem === 'dashboard',
    },
    {
      name: 'Workouts section',
      href: '/workout_section',
      isActive: activeItem === 'workout_section',
    },
    {
      name: 'Community section',
      href: '/community_section',
      isActive: activeItem === 'community_section',
    },
  ]

  return (
    <NavbarHeroui
      maxWidth="full"
      isBlurred={false}
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
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
      <NavbarContent>
        {session && status === 'authenticated' && (
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="sm:hidden"
          />
        )}
        <NavbarBrand className="hidden md:flex">
          <AcmeLogo />
        </NavbarBrand>
      </NavbarContent>

      {session && status === 'authenticated' && (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {navItems.map(item => (
            <NavbarItem key={item.href} isActive={item.isActive}>
              <Link color="foreground" href={item.href}>
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      )}

      <NavbarContent justify="end">
        {!session ? (
          <>
            <NavbarItem className="hidden md:flex">
              <Link href="/auth/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="/auth/signup"
                variant="flat"
                size="sm"
                className="md:text-base md:px-4"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    size: 'sm',
                    className: 'md:w-10 md:h-10',
                    src: session?.user?.image || undefined,
                  }}
                  className="transition-transform"
                  description={session?.user?.email}
                  name={session?.user?.name}
                  classNames={{
                    name: 'hidden md:block',
                    description: 'hidden md:block',
                  }}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" as={Link} href="/profile">
                  Profile
                </DropdownItem>
                <DropdownItem key="settings" as={Link} href="/settings">
                  Settings
                </DropdownItem>
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

      {session && status === 'authenticated' && (
        <NavbarMenu>
          {navItems.map(item => (
            <NavbarMenuItem key={`mobile-${item.href}`}>
              <Link
                href={item.href}
                className={`w-full ${item.isActive ? 'text-primary' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      )}
    </NavbarHeroui>
  )
}
