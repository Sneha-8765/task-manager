import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App.tsx'
import './index.css'

// Start the Mock Service Worker
async function enableMocking() {
  // Enable MSW in development AND for Vercel deployments
  if (import.meta.env.MODE === 'development' || 
      window.location.hostname.includes('vercel.app')) {
    const { worker } = await import('./mocks/browser')
    return worker.start()
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  )
})