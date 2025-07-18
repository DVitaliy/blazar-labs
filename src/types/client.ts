import { type Client, $Enums } from '@prisma/client'

export type IClient = Omit<Client, 'createdAt' | 'updatedAt'>
export const EClientStatus = $Enums.Status
