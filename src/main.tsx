import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './widgets/LayoutHeader/Header.tsx'
import App from './app/App.tsx'
import Footer from './widgets/LayoutFooter/Footer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <App />
    <Footer />
  </StrictMode>,
)
