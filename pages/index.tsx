import { FormEvent, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useAuth } from 'hooks/useAuth'

import styles from 'styles/Home.module.css'

export interface AlertState {
  type: 'success' | 'error'
  message: string
}

export default function Register() {
  const { handleSignUp } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState<AlertState | undefined>()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setAlert(undefined)

    try {
      await handleSignUp({
        name,
        email,
        password
      })
      setAlert({
        type: 'success',
        message: 'Account successfully created'
      })
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response.data.error
      })
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Authority - Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Create Your Account</h1>

        {alert && <span>{alert.message}</span>}

        <form onSubmit={onSubmit}>
          <input
            placeholder="Type your name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Type your email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Type your password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Register</button>
          <Link href="/signin">Go to Signin</Link>
        </form>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
