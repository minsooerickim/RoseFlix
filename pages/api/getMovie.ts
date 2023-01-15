import { NextApiRequest, NextApiResponse } from 'next'
import { GET_CONFIG } from '@/util/consts'
import { PrismaClient } from '@prisma/client'

import axios from 'axios'

export default async function getMovie(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = req.body
  const prisma = new PrismaClient()

  var formattedData = String(data).split('\n')

  var resultsList: {
    id: string
    resultType: string
    image: string
    title: string
    description: string
  }[] = []
  console.log(formattedData.length)

  // TODO: uncomment for real thin
  // for (let i = 0; i < formattedData.length; ++i) {
  //   if (formattedData[i] != '') {
  //     const response = await axios.get(
  //       'https://imdb-api.com/en/API/SearchMovie/' +
  //         process.env.IMD_API3 +
  //         '/' +
  //         formattedData[i],
  //       GET_CONFIG
  //     )
  //     resultsList = resultsList.concat(response.data.results)
  //   }
  // }

  // get rid of undefined results
  resultsList.filter((result) => result)

  // write json data
  // var fs = require('fs')
  // fs.writeFile('cars.json', JSON.stringify(resultsList), function (err: any) {
  //   if (err) throw err
  //   console.log('complete')
  // })

  // load json data (for static data)
  var json = require('/Users/minsookim/Documents/Github/whereiskanin/cars.json')

  json.map(async ({ id, resultType, image, title, description }) => {
    // check if movie exists first
    const movieExists = await prisma.movies.count({
      where: {
        title: title,
      },
    })
    if (movieExists == 0) {
      // register movie in db
      await prisma.movies.create({
        data: {
          id: id,
          resultType: resultType,
          image: image,
          title: title,
          description: description,
        },
      })
    }
  })

  return res.status(200).json(json)
  // return res.status(200).json(resultsList)
}
