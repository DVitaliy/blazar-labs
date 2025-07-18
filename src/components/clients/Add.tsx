'use client'
import SubmitButton from '@/components/ui/SubmitButton'
import { createClientAction } from '@/lib/actions/createClient'
import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AddClient() {
  const [state, submit] = useActionState(createClientAction, { success: false, error: '' })
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      router.push('/clients')
    }
  }, [state.success, router])

  return (
    <>
      {state.error && <div className="text-red-500">{state.error}</div>}
      <form action={submit}>
        <input type="text" placeholder="Name" name="name" />
        <input type="email" placeholder="Email" name="email" />
        <SubmitButton theme="secondary">Add Client</SubmitButton>
      </form>
    </>
  )
}
