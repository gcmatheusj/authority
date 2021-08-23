import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from 'react'
import axios from 'axios'
import router from 'next/router'
import { setCookie, parseCookies, destroyCookie } from 'nookies'

interface IHandleSignUpArgs {
  name: string
  email: string
  password: string
}

interface IHandleSignInArgs {
  email: string
  password: string
}

interface User {
  id: string
  name: string
}

export type AuthContextTypes = {
  user?: User
  handleSignIn: (args: IHandleSignInArgs) => Promise<void>
  handleSignUp: (args: IHandleSignUpArgs) => Promise<void>
  handleSignOut: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextTypes>(
  {} as AuthContextTypes
)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | undefined>()

  useEffect(() => {
    const { '@authority:user': authUser } = parseCookies()

    if (authUser) {
      setUser(JSON.parse(authUser))
    }
  }, [])

  const handleSignIn = useCallback(
    async ({ email, password }: IHandleSignInArgs) => {
      const { data } = await axios.post<User>(
        'http://localhost:3000/api/users/authenticate',
        {
          email,
          password
        }
      )

      setCookie(undefined, '@authority:user', JSON.stringify(data))
      setUser(data as User)
      router.push('/home')
    },
    []
  )

  const handleSignUp = useCallback(
    async ({ name, email, password }: IHandleSignUpArgs) => {
      await axios.post('http://localhost:3000/api/users', {
        name,
        email,
        password
      })
    },
    []
  )

  const handleSignOut = useCallback(() => {
    router.push('/signin')
    setUser(undefined)
    destroyCookie(undefined, '@authority:user')
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, handleSignIn, handleSignUp, handleSignOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
