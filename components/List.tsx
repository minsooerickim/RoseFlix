import axios from 'axios'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import Router from 'next/router'

export default function List() {
  const [movies, setMovies] = useState([])

  const [data, setData] = useState({ text: '' })
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = (url) => {
    console.log('inside' + url)
    if (url) {
      Router.push(url)
    }
  }
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
        await axios
          .post('/api/getMovie', { data: data.text })
          .then(function (res) {
            setMovies(res.data)
            console.log(movies)
          })
        setIsLoading(false)
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

  return (
    <div>
      <div>
        {isLoading ? (
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400 absolute w-full h-screen top-1/2 left-1/2"></div>
        ) : (
          <div className="grid grid-cols-4">
            <div className="flex flex-col justify-center align-middle items-center col-span-1 h-screen sticky top-0 pr-4">
              <div className="-mt-16 mb-16">
                <div className="alert alert-success shadow-lg">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current flex-shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Successfully Connected!</span>
                  </div>
                </div>
              </div>

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

            <div className="grid grid-cols-3 col-span-3 space-x-6 space-y-6 pr-4">
              {movies.map(
                ({ id, resultType, image, title, description, trailerUrl }) =>
                  image && (
                    <motion.div
                      key={id}
                      className="flex flex-col col-span-1 justify-center items-center hover:cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.995 }}
                      onClick={() => router(trailerUrl)}
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
          </div>
        )}
      </div>
    </div>
  )
}
