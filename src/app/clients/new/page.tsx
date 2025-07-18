import AddClient from '@/components/clients/Add'

export default async function AddNewClientPage() {
  return (
    <div className="grid items-center justify-items-center">
      <h1 className="text-2xl">Add New Client</h1>
      <AddClient />
    </div>
  )
}
