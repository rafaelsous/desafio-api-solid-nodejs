import { Pet, Prisma } from '@prisma/client'

export type FindManyParams = {
  city: string
  age?: number
  size?: string
  energy_level?: string
  environment?: string
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findMany(params: FindManyParams): Promise<Pet[]>
}
