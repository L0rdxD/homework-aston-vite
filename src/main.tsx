import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './widgets/LayoutHeader/Header.tsx'
import App from './app/App.tsx'
import Footer from './widgets/LayoutFooter/Footer.tsx'
import { ThemeProvider } from './shared/lib/theme'
import { Provider } from 'react-redux'
import { store } from './app/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <Header />
        <App />
        <Footer />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
