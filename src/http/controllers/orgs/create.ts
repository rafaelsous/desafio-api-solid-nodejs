import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgSchema = z.object({
    name: z.string(),
    founder_name: z.string(),
    email: z.string().email(),
    whatsapp: z.string(),
    password: z.string().min(6),
    street: z.string(),
    city: z.string(),
    state: z.string().min(2).max(2),
    cep: z.string().min(8).max(8),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const {
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
  } = createOrgSchema.parse(request.body)

  const createOrgUseCase = makeCreateOrgUseCase()

  await createOrgUseCase.execute({
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
  })

  return reply.status(201).send()
}
