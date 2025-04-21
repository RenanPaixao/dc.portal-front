import { Button } from '@/app/components/common/Button/Button'
import { CircleUserRound, LogOut } from 'lucide-react'
import { Form } from '@remix-run/react'
import { useUser } from '~/hooks/useUser'

export const Navbar = () => {
  const {user} = useUser()
  
  return <nav className={'flex justify-end p-8'}>
    {
      user ? (
        <Form method={'post'} action={'/auth/logout'} navigate={false}>
          <Button variant={'destructive'}> <LogOut /> Logout</Button>
        </Form>
      ) : (
        <Form method={'post'} action={'/auth/google'} navigate={false}>
          <Button> <CircleUserRound /> Login</Button>
        </Form>
      )
    }
  </nav>
}
