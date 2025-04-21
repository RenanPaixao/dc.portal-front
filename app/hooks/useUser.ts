import { useRouteLoaderData } from '@remix-run/react'

interface User {
  "profile": {
    "sub": string,
    "name": string,
    "given_name": string,
    "family_name": string,
    "picture": string,
    "email": string,
    "email_verified": boolean
  },
  "tokens": {
    "access_token": string,
    "expires_in": number
  }
}

export const useUser = () => {
  const { user = null } = useRouteLoaderData<{user: User | null}>('root') ?? {}
  return {
    user
  }
}
