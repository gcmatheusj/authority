import { FormEvent, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { useAuth } from 'hooks/useAuth'

import styles from 'styles/Home.module.css'

import { AlertState } from 'pages'

export default function SignIn() {
  const { handleSignIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState<AlertState | undefined>()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setAlert(undefined)

    try {
      await handleSignIn({
        email,
        password
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
        <title>Authority - SignIn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>SignIn</h1>

        {alert && <span>{alert.message}</span>}

        <form onSubmit={onSubmit}>
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

          <button type="submit">SignIn</button>
          <Link href="/">Create Account</Link>
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
