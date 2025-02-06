"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PropsWithChildren, useState } from 'react'

export const ReactQueryProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
