import request from 'supertest'
import { hashSync } from 'bcryptjs'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Get by ID (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet by id successfully', async () => {
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

    const pet = await prisma.pet.create({
      data: {
        name: 'Duque',
        about: 'Dócil e bricalhão',
        age: 2,
        size: 'médio porte',
        energy_level: 'super ativo',
        environment: 'precisa de espaço para brincar',
        org_id: org.id,
      },
    })

    const response = await request(app.server).get(`/pets/${pet.id}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'Duque',
      }),
    )
  })
})
