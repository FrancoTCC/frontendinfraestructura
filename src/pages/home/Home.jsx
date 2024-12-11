import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='min-h-screen w-full bg-gray-100 flex justify-center items-center'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center'>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>
          Bienvenido!!!
        </h1>
        <p className='text-gray-600 mb-6'>
          Haz clic en los siguientes enlaces para gestionar productos y categorías:
        </p>
        <div className='space-y-4'>
          <Link
            to='/productos'
            className='block text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105'
          >
            Ir a Productos
          </Link>
          <Link
            to='/categorias'
            className='block text-lg font-semibold text-white bg-green-600 hover:bg-green-700 py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105'
          >
            Ir a Categorías
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;