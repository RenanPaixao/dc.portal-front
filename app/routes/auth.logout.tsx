import { ActionFunctionArgs } from '@remix-run/router'
import { SessionStorage } from '~/services/session.server'
import { redirect } from '@remix-run/react'

export const action = async ({request}: ActionFunctionArgs)=> {
  const session = await SessionStorage.getSession(request.headers.get("Cookie"));
  
  return redirect('/', {
    headers: {
      'Set-Cookie': await SessionStorage.destroySession(session)
    }
  })
}
