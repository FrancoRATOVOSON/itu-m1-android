import request from 'supertest'
import { userTest } from '../libs'
import app from '../../src/server/app'
import prisma from '../../src/tools/prisma'
import {
  FIELD_MISSING,
  INVALID_EMAIL_FORMAT,
  PASSWORD_DIGIT_ERROR,
  PASSWORD_LENGTH_ERROR,
  PASSWORD_LOWERCASE_ERROR,
  PASSWORD_NONALPHA_ERROR,
  PASSWORD_UPPERCASE_ERROR,
  USER_ALREADY_EXISTS
} from '../../src/utils/const'

const SIGNIN = 'auth/signup'

describe('Test missing fields on signing up', () => {
  it('Should send email missing error', async () => {
    const { email: _, ...user } = userTest
    const response = await request(app).post(SIGNIN).send(user)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: `${FIELD_MISSING}-<email>` })
  })

  it('Should send password missing error', async () => {
    const { password: _, ...user } = userTest
    const response = await request(app).post(SIGNIN).send(user)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: `${FIELD_MISSING}-<password>` })
  })

  it('Should send firstName missing error', async () => {
    const { firstname: _, ...user } = userTest
    const response = await request(app).post(SIGNIN).send(user)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: `${FIELD_MISSING}-<firstName>` })
  })

  it('Should send lastName missing error', async () => {
    const { lastname: _, ...user } = userTest
    const response = await request(app).post(SIGNIN).send(user)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: `${FIELD_MISSING}-<lastName>` })
  })

  it('Should send email and password missing error', async () => {
    const { email: _, password: __, ...user } = userTest
    const response = await request(app).post(SIGNIN).send(user)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      message: `${FIELD_MISSING}-<email>-<password>`
    })
  })
})

describe('Test email verification error on signing up', () => {
  it('Should send error on email format', async () => {
    const user = { ...userTest, email: 'kotozafy.alexisemailcom' }
    const response = await request(app)
      .post(SIGNIN)
      .send(user)
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: INVALID_EMAIL_FORMAT })
  })

  it('Should send error on email format', async () => {
    const user = { ...userTest, email: 'kotozafy.alexis@emailcom' }
    const response = await request(app)
      .post(SIGNIN)
      .send(user)
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: INVALID_EMAIL_FORMAT })
  })
})

describe('Test password verification error on signing up', () => {
  it('Should send password length error', async () => {
    const user = { ...userTest, password: 'koto' }
    const response = await request(app)
      .post(SIGNIN)
      .send(user)
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: PASSWORD_LENGTH_ERROR })
  })

  it('Should send password uppercase missing error', async () => {
    const user = { ...userTest, password: 'kotoza' }
    const response = await request(app)
      .post(SIGNIN)
      .send(user)
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: PASSWORD_UPPERCASE_ERROR })
  })

  it('Should send password lowercase missing error', async () => {
    const user = { ...userTest, password: 'KOTOZAFY' }
    const response = await request(app)
      .post(SIGNIN)
      .send(user)
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: PASSWORD_LOWERCASE_ERROR })
  })

  it('Should send password digit missing error', async () => {
    const user = { ...userTest, password: 'Kotozafy' }
    const response = await request(app)
      .post(SIGNIN)
      .send(user)
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: PASSWORD_DIGIT_ERROR })
  })

  it('Should send password non alpha missing error', async () => {
    const user = { ...userTest, password: 'Kotozafy1' }
    const response = await request(app)
      .post(SIGNIN)
      .send(user)
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: PASSWORD_NONALPHA_ERROR })
  })
})

describe('Test valid user signing in', () => {
  const { email } = userTest
  beforeAll(async () => {
    await prisma.user.delete({ where: { email } })
  })
  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email } })
  })

  it('Should be a success', async () => {
    const response = await request(app)
      .post(SIGNIN)
      .send(userTest)
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('token')
  })

  it('Should be an error', async () => {
    const response = await request(app)
      .post(SIGNIN)
      .send(userTest)
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(409)
    expect(response.body).toEqual({ message: USER_ALREADY_EXISTS })
  })
})
