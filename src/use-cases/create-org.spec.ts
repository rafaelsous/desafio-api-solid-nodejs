import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { CreateOrgUseCase } from './create-org'

let orgsRepository: OrgsRepository
let sut: CreateOrgUseCase // sut: system under test

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create a new org successfully', async () => {
    const { org } = await sut.execute({
      name: 'Org 01',
      founder_name: 'John Doe',
      email: 'john.doe@email.com',
      whatsapp: '11 11111-1111',
      password: '123456',
      street: 'Rua 1',
      city: 'Palmas',
      state: 'Tocantins',
      cep: '11111-111',
      latitude: -10.2947506,
      longitude: -48.3090628,
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
