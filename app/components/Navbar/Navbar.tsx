import { Button } from '@/app/components/common/Button/Button'
import { CircleUserRound } from 'lucide-react'
import { Form } from '@remix-run/react'

export const Navbar = () => {
  return <nav className={'flex justify-end p-8'}>
    <Form method={'post'} action={'/auth/google'} navigate={false}>
      <Button> <CircleUserRound /> Login</Button>
    </Form>
  </nav>
}
