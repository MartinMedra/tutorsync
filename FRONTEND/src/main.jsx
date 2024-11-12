import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import App from './App.jsx'
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.css'

AOS.init();

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </StrictMode>,
)
