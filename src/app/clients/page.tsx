import { getClientsAction } from '@/lib/actions/getClients'
import ClientsList from '@/components/clients/List'
import Link from 'next/dist/client/link'

export default async function ClientsPage() {
  const clients = await getClientsAction()

  return (
    <div className="grid items-center justify-items-center">
      <h1 className="text-2xl">Clients Page</h1>
      <Link href="/clients/new" className="text-blue-500">
        Add New Client
      </Link>
      <ClientsList clients={clients} />
    </div>
  )
}
