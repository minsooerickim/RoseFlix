import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function getMovie(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()

  const movies = await prisma.movies.findMany({
    where: {
      image: {
        startsWith: 'https',
      },
    },
  })

  return res.status(200).json(movies)
}
