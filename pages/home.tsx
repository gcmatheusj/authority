import Head from 'next/head'
import Image from 'next/image'

import { useAuth } from 'hooks/useAuth'

import styles from 'styles/Home.module.css'

import { withSSRAuth } from 'utils/withSSRAuth'

export default function Home() {
  const { user, handleSignOut } = useAuth()

  return (
    <div className={styles.container}>
      <Head>
        <title>Authority - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Welcome Back, {user?.name}</h1>

        <button onClick={handleSignOut}>SignOut</button>
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

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})
