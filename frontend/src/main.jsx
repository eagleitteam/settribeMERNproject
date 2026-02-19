import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import './index.css'
import Mainpage from './components/layout/Mainpage'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';

// import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
