import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Create Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new org successfully', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'Org 01',
      founder_name: 'John Doe',
      email: 'john.doe@email.com',
      whatsapp: '11 11111-1111',
      password: '123456',
      street: 'Rua 1',
      city: 'Palmas',
      state: 'TO',
      cep: '12345678',
      latitude: -10.2947506,
      longitude: -48.3090628,
    })

    expect(response.statusCode).toEqual(201)
  })
})
