import { NextApiRequest, NextApiResponse } from 'next'
import { GET_CONFIG } from '@/util/consts'

import axios from 'axios'

export default async function getMovie(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = req.body

  // roy does parsing
  var formattedData = String(data).split('\n')
  // console.log(formattedData)
  // for (let i = 0; i < formattedData.length; ++i) {
  //   console.log(formattedData[i])
  //   formattedData[i] = formattedData[i].splice(3)
  // }
  // console.log(formattedData)

  var resultsList: { firstResult: any }[] = []
  console.log(formattedData.length)
  for (let i = 0; i < formattedData.length; ++i) {
    if (formattedData[i] != '') {
      const response = await axios.get(
        'https://imdb-api.com/en/API/SearchMovie/' +
          process.env.IMD_API2 +
          '/' +
          formattedData[i],
        GET_CONFIG
      )
      resultsList.push(response.data.results[0])
    }
  }

  // const response = await axios.get(
  //   'https://imdb-api.com/en/API/SearchMovie/' + process.env.IMD_API2 + '/lion',
  //   GET_CONFIG
  // )

  // const response = await axios.get('https://imdb-api.com/en/API/SearchMovie/' + process.env.IMD_API + '/' + { title }, GET_CONFIG)
  console.log(resultsList)
  return res.status(200).json(resultsList)
}
