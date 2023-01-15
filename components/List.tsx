import axios from 'axios'
import { useEffect, useState } from 'react'

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
        <h3 className="text-red-500">Enter Genre:</h3>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="button" onClick={() => setSearch(query)}>
          Search
        </button>

        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <div className="grid grid-cols-4">
            <div className="flex justify-center align-middle items-center col-span-1">
              filters
            </div>
            <div className="grid grid-cols-3 col-span-3 space-x-4 space-y-4">
              {movies.map(({ id, resultType, image, title, description }) => (
                <div
                  key={id}
                  className="flex flex-col col-span-1 justify-center items-center"
                >
                  {/* <p>{title}</p> */}
                  <img
                    src={image}
                    alt="movie thumbnail"
                    className=" rounded-2xl"
                    width={500}
                  />
                </div>
              ))}
            </div>
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
