import { type IClient } from '@/types/client'

export abstract class ClientDataSource {
  abstract getAll(): Promise<IClient[]>
  abstract getById(id: string): Promise<IClient | null>
  abstract create(data: Pick<IClient, 'name' | 'email'>): Promise<IClient>
  abstract update(id: string, data: Partial<Omit<IClient, 'id'>>): Promise<IClient | null>
  abstract delete(id: string): Promise<boolean>
}
