import React, { useEffect } from "react"
import { Outlet } from "react-router-dom"

const Layout: React.FC = () => {
  // useEffect(() => {
  //   fetch('127.0.0.1:8000/chat', {
  //     method: 'GET'
  //   })
  //   .then(res=> res.json())
  //   .then(data => console.log(data))
  //   .catch(err=> console.log(err))
  // }, [])

  return (
    <div className="flex justify-center items-center w-full h-[100vh] bg-blue-100">
      <Outlet />
    </div>
  )
}

export default Layout