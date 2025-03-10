import { LoaderFunctionArgs } from '@remix-run/node'
import { search } from '@/services/search/search'

export const loader = async ({request}: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  return await search(url.searchParams.get('search') ?? '')
}

