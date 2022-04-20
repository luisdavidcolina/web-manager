import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import cors from 'cors'
/*
const allowedOrigins = [
  /localhost/,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:8000',
]

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
  exposedHeaders: ['Set-Cookie'],
  allowedHeaders: ['Accept'],
}
*/

export default function getHandler() {
  return nextConnect<NextApiRequest, NextApiResponse>({
    onError(error, req, res) {
      if (error?.response?.status === 400) {
        return res.status(400).end()
      }
      return res
        .status(501)
        .json({ error: `Sorry something Happened! ${error.message}` })
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method ${req.method} Not Allowed` })
    },
  }).use(cors())
}
