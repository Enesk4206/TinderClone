import React, { useState } from 'react'
import LoginForm from "../components/LoginForm"
import SignupForm from "../components/SignupForm"

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-500'>
      <div className='w-full max-w-md'>
        <h2 className='text-center text-3xl font-extrabold text-white mb-8'>
          {isLogin ? "Sign in to Swipe" : "Create a Swipe account"}
        </h2>

        <div className='bg-white shadow-xl rounded-lg p-8'>
          {isLogin ? <LoginForm /> : <SignupForm/>}
        </div>
      </div>
    </div>
  )
}

export default AuthPage