import { NextApiRequest, NextApiResponse } from 'next'
import { GET_CONFIG } from '@/util/consts'

import axios from 'axios'

export default async function getMovie(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = req.body

  var formattedData = String(data).split('\n')

  var resultsList: { firstResult: any }[] = []
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
  //     resultsList.push(response.data.results[0])
  //   }
  // }

  // get rid of undefined results
  resultsList.filter((result) => result)

  // write json data
  // var fs = require('fs')
  // fs.writeFile('input.json', JSON.stringify(resultsList), function (err: any) {
  //   if (err) throw err
  //   console.log('complete')
  // })

  // load json data
  var json = require('/Users/minsookim/Documents/Github/whereiskanin/input.json')

  return res.status(200).json(json)
  return res.status(200).json(resultsList)
}
