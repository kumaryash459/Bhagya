import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.tsx'
import './index.css'
import { CLERK_PUBLISHABLE_KEY } from './config'

// Log the key for debugging (remove in production)
console.log('Clerk Key:', CLERK_PUBLISHABLE_KEY)

if (!CLERK_PUBLISHABLE_KEY) {
  console.error('Missing Clerk Publishable Key. Please check your .env file.')
  throw new Error("Missing Clerk Publishable Key")
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </StrictMode>,
)
