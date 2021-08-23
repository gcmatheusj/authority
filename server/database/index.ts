import 'reflect-metadata'
import { createConnection } from 'typeorm'

import { User } from 'server/modules/users/user.entity'

export const connectDb = async () => {
  const connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'authority',
    entities: [User]
  })

  return connection
}
