import React from 'react'
import Navbar from '../components/navbar.jsx'
import Body from '../components/body.jsx'

const home = () => {
  return (
    <div className='bg-[#15122B] text-[#F2F0FF] min-h-screen'>
        <Navbar />
        <Body />
    </div>
  )
}

export default home