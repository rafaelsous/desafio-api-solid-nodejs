import { makeFetchPetsByCityUseCase } from '@/use-cases/factories/make-fetch-pets-by-city-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchPetsByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchPetsByCityQuerySchema = z.object({
    city: z.string().min(1),
    age: z.coerce.number().optional(),
    size: z.string().optional(),
    energy_level: z.string().optional(),
    environment: z.string().optional(),
  })

  const { city, age, size, energy_level, environment } =
    fetchPetsByCityQuerySchema.parse(request.query)

  const fetchPetsByCityUseCase = makeFetchPetsByCityUseCase()

  const { pets } = await fetchPetsByCityUseCase.execute({
    city,
    age,
    size,
    energy_level,
    environment,
  })

  return reply.status(200).send({ pets })
}
