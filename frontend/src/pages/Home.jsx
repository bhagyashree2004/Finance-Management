import React from 'react'

import Navbar from '../components/Navbar.jsx'
import { Banner } from '../components/Banner.jsx'
import Footer from '../components/Footer.jsx'
// import Freebook from '../Freebook.jsx'

function Home() {
  return (
    <>
    <div className='bg-slate-100'>
        <Navbar/>
        <Banner/>
        <Footer/>
    </div>
        
    </>
  )
}

export default Home