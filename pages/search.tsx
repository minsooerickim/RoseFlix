import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import List from '@/components/List'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="px-4 py-4 h-screen w-full">
      <List />
    </div>
  )
}
