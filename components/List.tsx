import axios from 'axios'
import { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'

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
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <div className="grid grid-cols-4">
            <div className="flex flex-col justify-center align-middle items-center col-span-1 h-screen sticky top-0">
              <div className="mockup-code">
                <pre>
                  <code>Welcome to RoseFlix!</code>
                </pre>
              </div>

              <div className="form-control w-full max-w-xs pt-16">
                <div className="flex flex-row items-center">
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(event) => setQuery(event.target.value)}
                  />
                  <span
                    className="pl-4 hover:cursor-pointer"
                    onClick={() => setSearch(query)}
                  >
                    <BsSearch />
                  </span>
                </div>
              </div>
              <p className=" text-center py-4">
                Please type in the type of movies or shows you would like to
                see!
              </p>

              <div className="chat chat-start pt-16">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img src="https://placeimg.com/192/192/people" />
                  </div>
                </div>
                <div className="chat-bubble">
                  Give me a list of movies about women empowerment!
                </div>
              </div>
              <div className="chat chat-start py-4">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img src="https://placeimg.com/192/192/people" />
                  </div>
                </div>
                <div className="chat-bubble">
                  Give me a list of shows directed by female directors!
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 col-span-3 space-x-4 space-y-4">
              {movies.map(
                ({ id, resultType, image, title, description }) =>
                  image && (
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
                  )
              )}
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
