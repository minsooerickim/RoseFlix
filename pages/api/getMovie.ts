import { NextApiRequest, NextApiResponse } from 'next';
import { GET_CONFIG } from '@/util/consts';

import axios from 'axios';

export default async function getMovie(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { title } = req.body

    const response = await axios.get('https://imdb-api.com/en/API/SearchMovie/' + process.env.IMD_API + '/lion', GET_CONFIG)
    // const response = await axios.get('https://imdb-api.com/en/API/SearchMovie/' + process.env.IMD_API + '/' + { title }, GET_CONFIG)
    return res.status(200).json((response.data.results))
}