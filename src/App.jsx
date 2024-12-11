import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'
import Home from './pages/home/Home'
import Product from './pages/product/Product'
import Category from './pages/category/Category'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <BrowserRouter>

            <Routes>
              {/* Routes Store */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="productos" element={<Product />} />
                <Route path="categorias" element={<Category />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
    </BrowserRouter>
  );
};

export default App;