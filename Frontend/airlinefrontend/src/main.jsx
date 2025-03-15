import { createRoot } from 'react-dom/client'
import './index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { BrowserRouter, Routes, Route } from "react-router";

import FlightBookingPage from './FlightBooking.jsx'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/flight/:flightId" element={<FlightBookingPage />}>
      </Route>
    </Routes>
  </BrowserRouter>
)
