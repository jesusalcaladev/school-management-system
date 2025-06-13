'use client'

import * as React from 'react'
import { Link, useNavigate } from '@tanstack/react-router'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'
import { useAuthContext } from '@/context/auth-context'

type Options = {
  title: string
  href: string
  description: string
}

const optionStudents: Options[] = [
  {
    title: 'Crear nuevo estudiante',
    href: '/student/create',
    description: 'Crear nuevo estudiante para la institución',
  },
  {
    title: 'Ver estudiantes',
    href: '/student',
    description: 'Ver todos los estudiantes registrados',
  },
]

const optionsMatricula: Options[] = [
  {
    title: 'Ver matricula',
    href: '/matricula',
    description: 'Ver todas las matriculas registradas',
  },
]

export function Navigation() {
  return (
    <NavigationMenu viewport={false} className='mx-auto z-50'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Inicio</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
              <li className='row-span-3'>
                <NavigationMenuLink asChild>
                  <a
                    className='from-blue-100 to-blue-200 flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md'
                    href='/'
                  >
                    <div className='mt-4 mb-2 text-lg font-medium'>
                      Sistema Estudiantil
                    </div>
                    <p className='text-muted-foreground text-sm leading-tight'>
                      Dashboard de control de estudiantes
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Estudiantes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
              {optionStudents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem onClick={() => console.log('matricula')}>
          <Link to='/matricula'>
            <NavigationMenuTrigger>Matricula</NavigationMenuTrigger>
          </Link>
          <NavigationMenuContent>
            <ul className='grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
              {optionsMatricula.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={href}>
          <div className='text-sm leading-none font-medium'>{title}</div>
          <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export function Navbar() {
  const { logout } = useAuthContext()
  const navigate = useNavigate()
  return (
    <nav className='flex items-center justify-between mx-auto px-10 w-full pt-5'>
      <div className='w-20' />
      <Navigation />
      <Button
        onClick={() => {
          logout()
          navigate({
            to: '/',
          })
        }}
        variant={'outline'}
      >
        <LogOut />
        Cerrar sesión
      </Button>
    </nav>
  )
}
