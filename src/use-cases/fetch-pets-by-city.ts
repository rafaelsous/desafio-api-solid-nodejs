import { Pet } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repository'

type FetchPetsByCityUseCaseRequest = {
  city: string
  age?: number
  size?: string
  energy_level?: string
  environment?: string
}

type FetchPetsByCityUseCaseResponse = {
  pets: Pet[]
}

export class FetchPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
    energy_level,
    environment,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.findMany({
      city,
      age,
      size,
      energy_level,
      environment,
    })

    return { pets }
  }
}
