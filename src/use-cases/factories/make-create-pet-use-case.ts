import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { CreatePetUseCase } from '../create-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const createPetUseCase = new CreatePetUseCase(petsRepository, orgsRepository)

  return createPetUseCase
}
