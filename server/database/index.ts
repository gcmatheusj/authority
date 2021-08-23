import 'dotenv/config'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import * as env from 'env-var'

import { User } from 'server/modules/users/user.entity'

export const connectDb = async () => {
  const connection = await createConnection({
    type: 'postgres',
    host: env.get('TYPEORM_HOST').required().asString(),
    port: env.get('TYPEORM_PORT').required().asInt(),
    username: env.get('TYPEORM_USERNAME').required().asString(),
    password: env.get('TYPEORM_PASSWORD').required().asString(),
    database: env.get('TYPEORM_DATABASE').required().asString(),
    entities: [User]
  })

  return connection
}
