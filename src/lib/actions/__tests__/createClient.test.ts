import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createClientAction } from '@/lib/actions/createClient'

vi.mock('@/lib/db', () => ({
  clientDataSource: {
    create: vi.fn()
  }
}))
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn()
}))

import { clientDataSource } from '@/lib/db'
import { revalidatePath } from 'next/cache'

describe('createClientAction', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('return error if name or email is missing', async () => {
    const formData = new FormData()
    formData.set('name', '')
    formData.set('email', '')

    const result = await createClientAction({ success: false, error: '' }, formData)

    expect(result.error).toBe('Name and Email are required')
    expect(clientDataSource.create).not.toHaveBeenCalled()
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  it('creates a client and triggers revalidatePath', async () => {
    const formData = new FormData()
    formData.set('name', 'John Doe')
    formData.set('email', 'john@example.com')

    const result = await createClientAction({ success: true, error: '' }, formData)

    expect(clientDataSource.create).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com'
    })
    expect(revalidatePath).toHaveBeenCalledWith('/clients')
    expect(result).toEqual({ success: true, error: '' })
  })
})
