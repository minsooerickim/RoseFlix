import axios from 'axios'
import { useEffect, useState } from 'react'
import { GET_CONFIG } from '@/util/consts'

export default function List() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    axios.get('/api/getMovie', GET_CONFIG).then(function (res) {
      console.log(res)
      setMovies(res.data)
    })
    console.log(movies)
  }, [])
  return (
    <div>
      {movies.map(({ id, resultType, image, title, description }) => (
        <div key={id}>
          <p>
            {title} directed by {}
          </p>
          <img
            src={image}
            alt="movie thumbnail"
            className="w-full"
            width={100}
          />
        </div>
      ))}
    </div>
  )
}
