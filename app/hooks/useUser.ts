import { useRouteLoaderData } from '@remix-run/react'

export const useUser = () => {
  // TODO: add types
  const { user = null } = useRouteLoaderData<{user: any | null}>('root') ?? {}
  
  return {
    user
  }
}
