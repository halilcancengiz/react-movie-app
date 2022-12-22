import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import AnimatedRoutes from './components/AnimatedRoutes';
import { Toaster } from 'react-hot-toast';
import { BackTop } from 'antd';



export default function App() {
  const params = useLocation()

  return (
    <div style={{ background: "linear-gradient(135deg,,rgba(10, 37, 62, 1),rgba(10, 37, 62, .8))" }} className='App'>
      {
        params.pathname.startsWith("/register") || params.pathname.startsWith("/login") ? "" : <Navbar />
      }

      <AnimatedRoutes />

      <Toaster position="top-right" />
      {
        params.pathname.startsWith("/register") || params.pathname.startsWith("/login") ? "" : <Footer />
      }
      <div>
        <BackTop visibilityHeight={200} />
      </div>

    </div >
  )
}
