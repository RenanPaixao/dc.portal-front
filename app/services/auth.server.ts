import { Authenticator } from "remix-auth";
import { OAuth2Strategy,  } from "remix-auth-oauth2";
import { env } from '@/env'

type Tokens = {
  access_token: string,
  expires_in: number,
  scope: string,
  token_type: string,
  id_token: string
}

export const authenticator = new Authenticator();
const strategy = new OAuth2Strategy(
  {
    clientId: env.CLIENT_ID,
    clientSecret: env.CLIENT_SECRET,
    
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenEndpoint: "https://oauth2.googleapis.com/token",
    redirectURI: `${env.PUBLIC_URL}/auth/google/callback`,
    scopes: ["openid", "email", "profile"],
  },
  
  async ({ tokens }) => {
  const { access_token, expires_in } = tokens.data as Tokens;
    
    const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    
    return {
      profile: await res.json(),
      tokens: {
        access_token,
        expires_in,
      }
    }
  });

authenticator.use(strategy, 'google');
