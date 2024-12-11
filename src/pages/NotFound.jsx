import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='min-h-screen w-full bg-red-700 flex justify-center items-center'>
      <div className='bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full'>
        <h1 className='text-6xl font-extrabold text-red-500 mb-6'>
          404
        </h1>
        <p className='text-xl text-gray-700 mb-4'>
          La página que buscas no se encuentra disponible.
        </p>
        <p className='text-lg text-gray-500 mb-6'>
          Parece que hemos perdido el camino.
        </p>
        <Link to="/"
        className='text-lg font-semibold text-white bg-red-500 hover:bg-red-600 py-2 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105'
        >
          Volver al inicio
        </Link>
     
      </div>
    </div>
  );
};

export default NotFound;
