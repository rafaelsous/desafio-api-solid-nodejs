import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetParamsSchema = z.object({
    orgId: z.string().uuid(),
  })

  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.coerce.number(),
    size: z.string(),
    energyLevel: z.string(),
    environment: z.string(),
  })

  const { orgId } = createPetParamsSchema.parse(request.params)

  const { name, about, age, size, energyLevel, environment } =
    createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
    name,
    about,
    age,
    size,
    energyLevel,
    environment,
    orgId,
  })

  return reply.status(201).send()
}
