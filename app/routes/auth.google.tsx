import { authenticator } from '~/services/auth.server'
import { ActionFunctionArgs } from '@remix-run/router'

export async function action({ request }: ActionFunctionArgs) {
  await authenticator.authenticate('google', request);
}
