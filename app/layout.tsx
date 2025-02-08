import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar/Navbar'
import { ReactQueryProvider } from '@/components/ReactQueryProvider/ReactQueryProvider'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'PORTAL DC',
  description: 'Portal para as disciplinas do departamento de computação da UFRPE',
  manifest: '/site.webmanifest',
  icons: [
    {
      url: '/favicon-32x32.png',
      sizes: '16x16',
      type: 'image/png'
    },
    {
      url: '/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png'
    },
    {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png'
    }
  ]
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR' className={`${montserrat.className} antialiased`}>
      <body>
        <ReactQueryProvider>
          <Navbar />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  )
}
