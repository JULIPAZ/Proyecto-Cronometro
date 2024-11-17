import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Cronometro from './cronometro'
import  './cronometro.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cronometro />
  </StrictMode>,
)
