import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentElement !== null) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Luisda Manager</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <div
        style={{
          height: '100vh',
          maxHeight: '100vh',
          padding: '50px',
        }}
      >
        <Component {...pageProps} />
      </div>
    </React.Fragment>
  )
}

export default MyApp
