import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { GetPetUseCase } from './get-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: PetsRepository
let sut: GetPetUseCase // sut: system under test

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get a pet successfully', async () => {
    const pet = await petsRepository.create({
      name: 'Duque',
      about: 'Dócil e bricalhão',
      age: 2,
      size: 'médio porte',
      energy_level: 'super ativo',
      environment: 'precisa de espaço para brincar',
      org_id: 'org-01',
    })

    await sut.execute({ petId: pet.id })

    expect(pet.name).toEqual('Duque')
  })

  it('should not be able to get a pet when its not exists', async () => {
    await expect(() =>
      sut.execute({ petId: 'not-existing-pet-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
