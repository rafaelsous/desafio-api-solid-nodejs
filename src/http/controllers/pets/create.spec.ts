import { hashSync } from 'bcryptjs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new pet successfully', async () => {
    const org = await prisma.org.create({
      data: {
        name: 'Org 01',
        founder_name: 'John Doe',
        email: 'john.doe@email.com',
        whatsapp: '11 11111-1111',
        password_hash: hashSync('123456', 6),
        street: 'Rua 1',
        city: 'Palmas',
        state: 'TO',
        cep: '12345678',
        latitude: -10.2947506,
        longitude: -48.3090628,
      },
    })

    const response = await request(app.server)
      .post(`/orgs/${org.id}/pets`)
      .send({
        name: 'Duque',
        about: 'Dócil e bricalhão',
        age: 2,
        size: 'médio porte',
        energyLevel: 'super ativo',
        environment: 'precisa de espaço para brincar',
      })

    expect(response.statusCode).toEqual(201)
  })
})
