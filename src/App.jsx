import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import Routes from "./routes/Routes"
import { useLocation } from 'react-router-dom';

export default function App() {
  const { pathname } = useLocation()


  return (
    <div style={{ background: "linear-gradient(to right, rgba(10 37 62,.9),rgba(10 37 62,.9))" }} className='App'>
      {
        pathname.startsWith("/register") || pathname.startsWith("/login") ? "" : <Navbar />
      }
      <Routes />
      {
        pathname.startsWith("/register") || pathname.startsWith("/login") ? "" : <Footer />
      }

      <Toaster position="top-right" />

    </div >
  )
}
