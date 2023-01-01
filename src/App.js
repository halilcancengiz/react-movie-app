import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import AnimatedRoutes from './components/AnimatedRoutes';
import { Toaster } from 'react-hot-toast';




export default function App() {
  const { pathname } = useLocation()

  return (
    <div style={{ background: "linear-gradient(to right, rgba(10 37 62,.9),rgba(10 37 62,.9))" }} className='App'>
      {
        pathname.startsWith("/register") || pathname.startsWith("/login") ? "" : <Navbar />
      }

      <AnimatedRoutes />

      <Toaster position="top-right" />
      {
        pathname.startsWith("/register") || pathname.startsWith("/login") ? "" : <Footer />
      }

    </div >
  )
}
