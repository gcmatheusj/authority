import type { NextApiRequest, NextApiResponse } from 'next'

import { connectDb } from 'server/database'
import { registerUserService } from 'server/modules/users/user.service'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, password } = req.body;

  if (req.method === 'POST') {
    if (!name || !email || !password) {
      return res.status(400).json({ 
        error: 'You must provide name, email and password to create a user'
      })
    }

    const connection = await connectDb()
  
    try {
      const user = await registerUserService({ 
        name,
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
