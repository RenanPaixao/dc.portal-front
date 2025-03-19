import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useResolvedPath
} from '@remix-run/react'
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import { Button } from '~/components/common/Button/Button'
import { ArrowLeftIcon } from 'lucide-react'

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  
  const resolvedUrl = useResolvedPath('..')
  
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
      {
        location.pathname !== '/' && (
          <Button variant={'ghost'} asChild>
            <Link to={resolvedUrl} reloadDocument>
              <ArrowLeftIcon/> Voltar
            </Link>
          </Button>
        )
      }
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
