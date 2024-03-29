import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'


export default function Document() {

  return (
    <Html>
      <Head>
        {/* Poppins */}
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;800;900&display=swap" rel="stylesheet" /> 
        </Head>
        {/* Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
