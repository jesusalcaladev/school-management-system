import { Navbar } from '@/components/navbar'
import { useAuthContext } from '@/context/auth-context'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => {
    const { isAuthenticated } = useAuthContext()
    return (
      <>
        {isAuthenticated && <Navbar />}
        <Outlet />
      </>
    )
  },
})
