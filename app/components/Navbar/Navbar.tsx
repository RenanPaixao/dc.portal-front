import { Button } from '@/app/components/common/Button/Button'
import { CircleUserRound } from 'lucide-react'

export const Navbar = () => {
  return <nav className={'flex justify-end p-8'}>
    <Button> <CircleUserRound /> Login</Button>
  </nav>
}
