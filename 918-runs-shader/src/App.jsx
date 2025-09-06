import { useState } from 'react'
import Hero from './components/Hero'
import SessionCalendar from './components/SessionCalendar'
import RegisterForm from './components/RegisterForm'
import Gallery from './components/Gallery'
import Newsletter from './components/Newsletter'
import './App.css'

function App() {
  const [selectedSessionId, setSelectedSessionId] = useState(null)

  return (
    <main>
      <Hero />
      <SessionCalendar onSelect={(id) => setSelectedSessionId(id)} />
      <RegisterForm sessionId={selectedSessionId} />
      <Gallery />
      <Newsletter />
    </main>
  )
}

export default App
