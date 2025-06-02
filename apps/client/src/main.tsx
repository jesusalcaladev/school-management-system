import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import './index.css'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { useAuthContext, AuthProvider } from './context/auth-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

// Create a new router instance
const router = createRouter({ routeTree, context: { auth: undefined } })

const client = new QueryClient()

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const InnerApp = () => {
  const auth = useAuthContext()
  return (
    <RouterProvider
      router={router}
      context={{
        auth,
      }}
    />
  )
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={client}>
        <AuthProvider>
          <Toaster />
          <InnerApp />
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}
