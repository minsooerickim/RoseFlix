import axios from 'axios'
import { useEffect, useState } from 'react'
import { GET_CONFIG } from '@/util/consts'

export default function List() {
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
        axios.post('/api/getMovie', { data: data.text }).then(function (res) {
          console.log(res.data + 'bruh')
          setMovies(res.data)
          console.log(movies)
        })
      }
    }

    fetchData()
  }, [search])

  //   useEffect(() => {
  //     const titles = data.text
  //     console.log(data.text + 'called')
  //     axios.get('/api/getMovie', { data: data.text }).then(function (res) {
  //       console.log(res)
  //       setMovies(res.data)
  //     })
  //   }, [data])

  return (
    // <div>
    //   {movies.map(({ id, resultType, image, title, description }) => (
    //     <div key={id}>
    //       <p>
    //         {title} directed by {}
    //       </p>
    //       <img
    //         src={image}
    //         alt="movie thumbnail"
    //         className="w-full"
    //         width={100}
    //       />
    //     </div>
    //   ))}
    // </div>

    <div>
      <div>
        <h3>Enter Genre:</h3>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="button" onClick={() => setSearch(query)}>
          Search
        </button>

        <h4>Movies</h4>
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <div>
            {movies.map(({ id, resultType, image, title, description }) => (
              <div key={id}>
                <p>{title}</p>
                <img
                  src={image}
                  alt="movie thumbnail"
                  className="w-full"
                  width={500}
                />
              </div>
            ))}
            {/* <span>{data.text}</span>
            <img
              src={image}
              alt="movie thumbnail"
              className="w-full"
              width={100}
            /> */}
          </div>
        )}
      </div>
    </div>
  )
}
