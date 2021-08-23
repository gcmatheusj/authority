import type { NextApiRequest, NextApiResponse } from 'next'

import { connectDb } from 'server/database'
import { authenticateUserService } from 'server/modules/users/user.service'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body

  if (req.method === 'POST') {
    if (!email || !password) {
      return res.status(400).json({
        error: 'You must provide email and password to authenticate'
      })
    }

    const connection = await connectDb()

    try {
      const user = await authenticateUserService({
        email,
        password
      })

      return res.status(200).json(user)
    } catch (error) {
      return res.status(401).json({ error: error.message })
    } finally {
      await connection.close()
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
