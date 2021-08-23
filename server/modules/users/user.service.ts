import { compare, hash } from 'bcryptjs'
import { getRepository } from 'typeorm'

import { User } from './user.entity'

interface IRegisterUserArgs {
  name: string
  email: string
  password: string
}

interface IAuthenticateUserArgs {
  email: string
  password: string
}

export const registerUserService = async ({
  name,
  email,
  password
}: IRegisterUserArgs): Promise<User> => {
  const userRepository = getRepository(User)

  const isAlreadyExistingUser = await userRepository.findOne({
    where: {
      email
    }
  })

  if (isAlreadyExistingUser) {
    throw new Error('User already exists')
  }

  const hashedPassword = await hash(password, 12)

  const createdUser = userRepository.create({
    name,
    email,
    password: hashedPassword
  })

  const user = await userRepository.save(createdUser)

  delete user.password

  return user
}

export const authenticateUserService = async ({
  email,
  password
}: IAuthenticateUserArgs): Promise<User> => {
  const userRepository = getRepository(User)

  const user = await userRepository.findOne({
    where: {
      email
    }
  })

  if (!user) {
    throw new Error('Invalid credentials')
  }

  const isPasswordValid = await compare(password, user.password)

  if (!isPasswordValid) {
    throw new Error('Invalid credentials')
  }

  delete user.password

  return user
}
