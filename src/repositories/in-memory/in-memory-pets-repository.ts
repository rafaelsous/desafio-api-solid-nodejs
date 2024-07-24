import { randomUUID } from 'node:crypto'
import { Pet, Prisma } from '@prisma/client'

import { FindManyParams, PetsRepository } from '@/repositories/pets-repository'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  #pets: Pet[] = []

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      environment: data.environment,
      org_id: data.org_id,
    }

    this.#pets.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.#pets.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findMany(params: FindManyParams) {
    const orgsByCity = this.orgsRepository.orgs.filter(
      (org) => org.city === params.city,
    )

    const pets = this.#pets
      .filter((pet) => orgsByCity.some((org) => org.id === pet.org_id))
      .filter((pet) => (params.age ? pet.age === params.age : true))
      .filter((pet) => (params.size ? pet.size === params.size : true))
      .filter((pet) =>
        params.energy_level ? pet.energy_level === params.energy_level : true,
      )
      .filter((pet) =>
        params.environment ? pet.environment === params.environment : true,
      )

    return pets
  }
}
