import { createContext, useContext, useEffect, useState } from 'react'

export type AuthContextType = {
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

const TOKEN_KEY = 'token_access'

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const login = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
