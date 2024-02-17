/* Documento inicial de la APP */
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <meta name="description" content="Web3" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'true'} />
                <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap" rel="stylesheet" />
                <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css" />
                <link rel="icon" href="src/assets/icons/metamask.png" />
                <title>Web3</title>
               
            </Head>
            <body className='bg-green-900'>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}