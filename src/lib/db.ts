import { ClientDataSource } from './datasource/base/client'
import { PrismaClientDataSource } from './datasource/prisma/client'
import { JsonClientDataSource } from './datasource/json/client'

export const clientDataSource: ClientDataSource = process.env.NODE_ENV === 'production' ? new PrismaClientDataSource() : new JsonClientDataSource()
