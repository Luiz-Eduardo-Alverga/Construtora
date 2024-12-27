import './global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { router } from '@/routes/routes'

import { ThemeProvider } from './components/theme/theme-provider'
import { queryClient } from './lib/react-query'

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="point-theme">
        <Toaster position='top-center' closeButton={true} richColors />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
