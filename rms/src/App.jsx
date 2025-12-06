import { useState } from 'react'
import './App.css'
import MenuPage from './Pages/menu.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MenuPage />
    </>
  )
}

export default App
