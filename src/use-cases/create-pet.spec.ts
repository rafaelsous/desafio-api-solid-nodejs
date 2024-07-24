import { hashSync } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase // sut: system under test

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to create a new pet successfully', async () => {
    await orgsRepository.create({
      id: 'org-01',
      name: 'Org 01',
      founder_name: 'John Doe',
      email: 'john.doe@email.com',
      whatsapp: '11 11111-1111',
      password_hash: hashSync('123456', 6),
      street: 'Rua 1',
      city: 'Palmas',
      state: 'Tocantins',
      cep: '11111-111',
      latitude: -10.2947506,
      longitude: -48.3090628,
    })

    const { pet } = await sut.execute({
      name: 'Duque',
      about: 'Dócil e bricalhão',
      age: 2,
      size: 'médio porte',
      energyLevel: 'super ativo',
      environment: 'precisa de espaço para brincar',
      orgId: 'org-01',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new pet when org not exists', async () => {
    await expect(
      async () =>
        await sut.execute({
          name: 'Duque',
          about: 'Dócil e bricalhão',
          age: 2,
          size: 'médio porte',
          energyLevel: 'super ativo',
          environment: 'precisa de espaço para brincar',
          orgId: 'org-01',
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
