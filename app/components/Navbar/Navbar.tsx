import { Button } from '@/app/components/common/Button/Button'
import { ArrowLeftIcon, LogOut } from 'lucide-react'
import { Form, useLocation, useNavigate } from '@remix-run/react'
import { useUser } from '~/hooks/useUser'

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {user} = useUser()
  
  return <nav className={'flex justify-end p-8'}>
    {
      location.pathname !== '/' && (
        <Button variant={'ghost'} className={'mr-auto'} onClick={() => navigate(-1)}>
          <ArrowLeftIcon/> Voltar
        </Button>
      )
    }
    {
      user ? (
        <Form method={'post'} action={'/auth/logout'} navigate={false}>
          <Button variant={'destructive'}> <LogOut /> Logout</Button>
        </Form>
      ) : (
        <Form method={'post'} action={'/auth/google'} navigate={false}>
          <Button variant={'outline'}> <img src={'google-logo.svg'} alt={'logo da google'}/> Login</Button>
        </Form>
      )
    }
  </nav>
}
