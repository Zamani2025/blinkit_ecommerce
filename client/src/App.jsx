import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Blinkit Ecommerce'
  }, [])

  return (
    <>
      <ToastContainer theme='colored' />
      <Header />
      <main className='h-[82vh]'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
