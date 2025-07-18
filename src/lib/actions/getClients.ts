import { clientDataSource } from '@/lib/db'
import { cache } from 'react'

export const getClientsAction = cache(async () => {
  return clientDataSource.getAll()
})
