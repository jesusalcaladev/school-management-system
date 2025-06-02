import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (context?.auth?.isAuthenticated === false) {
      throw redirect({
        replace: true,
        to: '/login',
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard"!</div>
}
