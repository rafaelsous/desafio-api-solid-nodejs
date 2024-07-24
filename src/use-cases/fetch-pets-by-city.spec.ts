import { hashSync } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: FetchPetsByCityUseCase // sut: system under test

describe('Fetch Pets By City Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new FetchPetsByCityUseCase(petsRepository)
  })

  it('should be able to fetch pets by city successfully', async () => {
    const org = await orgsRepository.create({
      id: 'org-01',
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
    })

    await petsRepository.create({
      id: 'pet-01',
      name: 'Duque',
      about: 'Dócil e bricalhão',
      age: 2,
      size: 'médio porte',
      energy_level: 'super ativo',
      environment: 'precisa de espaço para brincar',
      org_id: org.id,
    })

    await petsRepository.create({
      id: 'pet-02',
      name: 'Linda',
      about: 'Muito preguiçosa',
      age: 1,
      size: 'pequeno porte',
      energy_level: 'super tranquila',
      environment: 'gosta de explorar o ambiente',
      org_id: org.id,
    })

    const { pets } = await sut.execute({ city: org.city })

    expect(pets).toHaveLength(2)
  })

  it('should be able to fetch pets by city and age successfully', async () => {
    const org = await orgsRepository.create({
      id: 'org-01',
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
    })

    await petsRepository.create({
      id: 'pet-01',
      name: 'Duque',
      about: 'Dócil e bricalhão',
      age: 2,
      size: 'médio porte',
      energy_level: 'super ativo',
      environment: 'precisa de espaço para brincar',
      org_id: org.id,
    })

    await petsRepository.create({
      id: 'pet-02',
      name: 'Linda',
      about: 'Muito preguiçosa',
      age: 1,
      size: 'pequeno porte',
      energy_level: 'super tranquila',
      environment: 'gosta de explorar o ambiente',
      org_id: org.id,
    })

    const { pets } = await sut.execute({ city: org.city, age: 1 })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Linda' })])
  })
})
