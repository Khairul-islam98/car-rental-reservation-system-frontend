import { Outlet } from 'react-router-dom'
import Footer from './components/shared/Footer'

function App() {

  return (
    <>
      <Outlet />
      <Footer />
    </>
  )
}

export default App
