'use server'

import { clientDataSource } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createClientAction(prevState: { success: boolean; error: string }, formData: FormData) {
  const name = formData.get('name')?.toString().trim()
  const email = formData.get('email')?.toString().trim()

  if (!name || !email) {
    return { success: false, error: 'Name and Email are required' }
  }

  await clientDataSource.create({ name, email })
  revalidatePath('/clients')
  return { success: true, error: '' }
}
