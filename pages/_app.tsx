import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRef } from 'react'
import Main from '../components/main';

function MyApp({ Component, pageProps, router }: AppProps) {
  const ref = useRef<HTMLDivElement>(null);

  return <Main ref={ref}>
    <Component {...pageProps} constraintsRef={ref} key={router.pathname} />
  </Main>
}

export default MyApp
