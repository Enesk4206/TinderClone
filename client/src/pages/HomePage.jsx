import React from 'react'
import { useAuthStore } from '../store/useAuthStore'


const HomePage = () => {

  const {logout} = useAuthStore();
   
  return (
    <div>
      <p>HomePage</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default HomePage