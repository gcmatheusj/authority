import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useAuth } from 'hooks/useAuth'

import { withSSRAuth } from 'utils/withSSRAuth'

import styles from 'styles/pages.module.css'

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

        <div className={styles.linkWrapper}>
          <Link href="/signin" passHref>
            <a className={styles.link} onClick={handleSignOut}>
              Sign Out
            </a>
          </Link>
        </div>
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
