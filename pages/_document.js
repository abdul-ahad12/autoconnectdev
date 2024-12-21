// pages/_document.js

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Primary Meta Tags */}
        <title>Autolinx - Book Your Mechanic</title>
        <meta name="title" content="Autolinx - Book Your Mechanic" />
        <meta
          name="description"
          content="Autolinx is your trusted platform to book professional mechanics for all your automotive needs. Fast, reliable, and convenient."
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.autolinx.com/" />
        <meta property="og:title" content="Autolinx - Book Your Mechanic" />
        <meta
          property="og:description"
          content="Autolinx is your trusted platform to book professional mechanics for all your automotive needs. Fast, reliable, and convenient."
        />
        <meta property="og:image" content="https://www.autolinx.com/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.autolinx.com/" />
        <meta property="twitter:title" content="Autolinx - Book Your Mechanic" />
        <meta
          property="twitter:description"
          content="Autolinx is your trusted platform to book professional mechanics for all your automotive needs. Fast, reliable, and convenient."
        />
        <meta property="twitter:image" content="https://www.autolinx.com/twitter-image.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.png" />
        {/* If you have different favicon formats, you can add them here */}
        {/* <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /> */}

        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
