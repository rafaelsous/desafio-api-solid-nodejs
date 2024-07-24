import { FastifyInstance } from 'fastify'

import { create } from './create'
import { getById } from './get-by-id'
import { fetchPetsByCity } from './fetch-pets-by-city'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/orgs/:orgId/pets', create)

  app.get('/pets/:petId', getById)
  app.get('/pets', fetchPetsByCity)
}
