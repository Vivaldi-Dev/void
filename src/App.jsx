import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboar from './pages/Dashboad/Dashboar'
import LoginPage from './pages/login/LoginPage'
import { AuthProvider } from './context/ContextUSer'

function App() {
  return (
    <AuthProvider> 
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/dashboard' element={<Dashboar />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
