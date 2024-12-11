import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
      <div className="min-h-screen w-full">
        <Outlet />

      </div>
    </>
  );
}

export default MainLayout;