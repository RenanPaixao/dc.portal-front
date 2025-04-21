import { authenticator } from '~/services/auth.server'
import { ActionFunctionArgs } from '@remix-run/router'
import { SessionStorage } from '~/services/session.server'
import { redirect } from '@remix-run/react'

export async function loader({ request }: ActionFunctionArgs) {
  try {
    const  data = await authenticator.authenticate("google", request);
    const session = await SessionStorage.getSession(request.headers.get("Cookie"));
    session.set("user", data);
    
    const cookie = await SessionStorage.commitSession(session);
    
    return redirect('/', {
      headers: {
        "Set-Cookie": cookie
      }
    })
  }catch(e){
    console.log('Error authenticating with Google:', e);
    redirect('/')
  }
}
