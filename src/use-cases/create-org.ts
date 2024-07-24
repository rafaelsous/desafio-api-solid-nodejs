import { hash } from 'bcryptjs'
import { Org } from '@prisma/client'

import { OrgsRepository } from '@/repositories/orgs-repository'

type CreateOrgUseCaseRequest = {
  name: string
  founder_name: string
  email: string
  whatsapp: string
  password: string
  street: string
  city: string
  state: string
  cep: string
  latitude: number
  longitude: number
}

type CreateOrgUseCaseResponse = {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    founder_name,
    email,
    whatsapp,
    password,
    street,
    city,
    state,
    cep,
    latitude,
    longitude,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      name,
      founder_name,
      email,
      whatsapp,
      password_hash: passwordHash,
      street,
      city,
      state,
      cep,
      latitude,
      longitude,
    })

    return { org }
  }
}
