import { PrismaClient } from '@prisma/client'
import { ClientDataSource } from '../base/client'
import { type IClient } from '@/types/client'

export class PrismaClientDataSource extends ClientDataSource {
  private prisma = new PrismaClient()

  async getAll() {
    return this.prisma.client.findMany()
  }

  async getById(id: string) {
    return this.prisma.client.findUnique({ where: { id } })
  }

  async create(data: Omit<IClient, 'id'>) {
    return this.prisma.client.create({ data })
  }

  async update(id: string, data: Partial<Omit<IClient, 'id'>>) {
    return this.prisma.client.update({ where: { id }, data })
  }

  async delete(id: string) {
    await this.prisma.client.delete({ where: { id } })
    return true
  }
}
