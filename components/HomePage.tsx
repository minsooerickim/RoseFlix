import axios from 'axios'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'

export default function HomePage() {
  return (
    <section className="dark:bg-gray-800 dark:text-gray-100 h-screen items-center align-middle justify-center">
      <div className="container flex flex-col justify-center align-middle items-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
        <div className="flex items-center align-middle justify-center p-6 mt-8">
          <img
            src="https://motivat-io.s3.us-west-1.amazonaws.com/Business_SVG.svg"
            alt=""
            className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
          />
        </div>
        <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 className="text-5xl font-bold leading-none sm:text-6xl">
            Rose
            <span className="dark:text-indigo-400">Flix</span>
          </h1>
          <p className="mt-6 mb-8 text-lg sm:mb-12">
          A Netflix-like software for personalized recommendations for women-centric content using machine learning and prioritizing diversity and inclusivity
            <br className="hidden md:inline lg:hidden" />
          </p>
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <a
              rel="noopener noreferrer"
              href="search"
              className="px-8 py-3 text-lg font-semibold rounded dark:bg-indigo-400 dark:text-gray-900"
            >
              Search Now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
