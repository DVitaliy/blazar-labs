'use client'
import { type IClient } from '@/types/client'

export default function ClientsList({ clients }: { clients: IClient[] }) {
  return (
    <ul>
      {clients.map((client) => (
        <li key={client.id}>
          {client.name} <span>{client.email}</span>
        </li>
      ))}
    </ul>
  )
}
