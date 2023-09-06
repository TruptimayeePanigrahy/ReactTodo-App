import React from 'react'


import UserProfile from '../components/UserProfile'
import Navbar from '../components/Navbar'
import Maintask from '../components/Maintask'

export default function Home() {
  return (
    <div id='home'>

      <Navbar/>
      <UserProfile/>
      <Maintask/>
      

        
    </div>
  )
}
