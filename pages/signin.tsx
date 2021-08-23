import { FormEvent, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { useAuth } from 'hooks/useAuth'

import { AlertState } from 'pages'

import styles from 'styles/pages.module.css'

export default function SignIn() {
  const { handleSignIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState<AlertState | undefined>()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setAlert(undefined)
    setLoading(true)

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
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Authority - SignIn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Log in to Authority</h1>

        {alert && (
          <span
            className={
              alert && alert.type === 'success' ? styles.success : styles.error
            }
          >
            {alert.message}
          </span>
        )}

        <form className={styles.form} onSubmit={onSubmit}>
          <input
            className={styles.input}
            placeholder="Type your email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className={styles.input}
            placeholder="Type your password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Sign In'}
          </button>

          <div className={styles.linkWrapper}>
            <Link href="/" passHref>
              <a className={styles.link}>Create Account</a>
            </Link>
          </div>
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
