import Navbar from '@/components/Navbar'
import ThemeButton from '@/components/ThemeButton'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      {/* <ThemeButton /> */}
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
