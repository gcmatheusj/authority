import { FormEvent, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useAuth } from 'hooks/useAuth'

import styles from 'styles/pages.module.css'

export interface AlertState {
  type: 'success' | 'error'
  message: string
}

export default function Register() {
  const { handleSignUp } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState<AlertState | undefined>()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setAlert(undefined)
    setLoading(true)

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
      setName('')
      setEmail('')
      setPassword('')
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
        <title>Authority - Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Create Your Account</h1>

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
            placeholder="Type your name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <button className={styles.button} type="submit">
            {loading ? 'Loading...' : 'Register'}
          </button>
          <div className={styles.linkWrapper}>
            <Link href="/signin" passHref>
              <a className={styles.link}>Go to SignIn</a>
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
