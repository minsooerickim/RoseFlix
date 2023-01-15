import axios from 'axios'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'

export default function GalleryPage() {
  const [movies, setMovies] = useState([])

  const [data, setData] = useState({ text: '' })
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        setIsLoading(true)
        const res = await fetch(`/api/ai`, {
          body: JSON.stringify({
            name: search,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
        const data = await res.json()
        setData(data)
        setIsLoading(false)
        await axios
          .post('/api/getMovie', { data: data.text })
          .then(function (res) {
            setMovies(res.data)
            console.log(movies)
          })
      }
    }

    fetchData()
  }, [search])

  useEffect(() => {
    axios
      .get('/api/getInitialMoviesFromDb', { data: data.text })
      .then(function (res) {
        console.log(res.data)
        setMovies(res.data)
      })
  }, [])

  // spits us just a gallery of movies on the right side of the screen
  return (
    <div className="grid grid-cols-2 col-span-6 space-x-6 space-y-6 pr-4">
      {movies.map(
        ({ id, resultType, image, title, description }) =>
          image && (
            <motion.div
              key={id}
              className="flex flex-col col-span-1 justify-center items-center hover:cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.995 }}
            >
              <img
                src={image}
                alt="movie thumbnail"
                className=" rounded-2xl"
                width={500}
              />
            </motion.div>
          )
      )}
    </div>
  )
}
