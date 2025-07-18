import { v4 as uuid } from 'uuid'
import fs from 'fs/promises'
import path from 'path'
import { ClientDataSource } from '../base/client'
import { type IClient, EClientStatus } from '@/types/client'

const filePath = path.join(process.cwd(), 'data', 'clients.json')

async function read(): Promise<IClient[]> {
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function write(clients: IClient[]) {
  await fs.writeFile(filePath, JSON.stringify(clients, null, 2), 'utf-8')
}

export class JsonClientDataSource extends ClientDataSource {
  async getAll() {
    return await read()
  }

  async getById(id: string) {
    const clients = await read()
    return clients.find((c) => c.id === id) || null
  }

  async create(data: Pick<IClient, 'name' | 'email'>) {
    const clients = await read()
    const newClient = { id: uuid(), status: EClientStatus.NEW, lastContactDate: new Date(), ...data }
    clients.push(newClient)
    await write(clients)
    return newClient
  }

  async update(id: string, data: Partial<Omit<IClient, 'id'>>) {
    const clients = await read()
    const index = clients.findIndex((c) => c.id === id)
    if (index === -1) return null
    clients[index] = { ...clients[index], ...data }
    await write(clients)
    return clients[index]
  }

  async delete(id: string) {
    const clients = await read()
    const updated = clients.filter((c) => c.id !== id)
    await write(updated)
    return updated.length < clients.length
  }
}
