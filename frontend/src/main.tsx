import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './services/queryClient.ts'
import { Toaster } from 'sonner'
import { AuthProvider } from './context/useAuthStore.tsx'
import "@fortawesome/fontawesome-free/css/all.min.css";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <Toaster duration={3000}position="top-right" richColors/>
    <AuthProvider>
      {/* <PermissionProvider> */}
      <App />
    {/* </PermissionProvider> */}
    </AuthProvider>
    </QueryClientProvider>
 
  </StrictMode>,
)
