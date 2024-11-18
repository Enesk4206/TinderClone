import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import Sidebar from '../components/Sidebar';
import { useMatchesStore } from '../store/useMatchesStore';

const HomePage = () => {

   const {isLoadingUserProfiles, getUserProfiles, userProfiles} = useMatchesStore();
   useEffect(()=>{
    getUserProfiles();
   },[getUserProfiles])
   console.log("User profiles: ",userProfiles)
  return (
    <div className='flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden'>
        <Sidebar/>

    </div>
  )
}

export default HomePage