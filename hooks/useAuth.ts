import { useContext } from 'react'
import { AuthContextTypes, AuthContext } from 'contexts/AuthContext'

export function useAuth(): AuthContextTypes {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be inside an AuthProvider')
  }

  return context
}
