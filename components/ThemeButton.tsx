import { useTheme } from 'next-themes'
import { IoRoseOutline, IoRoseSharp } from 'react-icons/io5'

export default function ThemeButton() {
  const { theme, setTheme } = useTheme()
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? <IoRoseOutline /> : <IoRoseSharp />}
    </button>
  )
}
