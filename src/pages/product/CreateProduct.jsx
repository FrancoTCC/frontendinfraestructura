import React, { useState, useEffect } from "react";
import productService from "../../services/product/productService";
import categoryService from "../../services/category/categoryService";

const CreateProduct = ({ onCreate, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    stock: 0,
    categoryId: 0,
  });

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const data = await categoryService.getAllCategories();
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("La respuesta no contiene un array de categorías:", data);
          setCategories([]);
        }
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = await productService.createProduct(formData);
      onCreate(newProduct); // Llamar al callback con el nuevo producto
      onClose();
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label className="block text-gray-700">Nombre del Producto</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Precio</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Stock</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Categoría</label>
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value={0} disabled>Seleccione una categoría</option>
          {loadingCategories ? (
            <option>Cargando categorías...</option>
          ) : (
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          )}
        </select>
      </div>
      <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-md">
        Crear Producto
      </button>
      <button
        type="button"
        onClick={onClose}
        className="ml-4 px-6 py-2 bg-gray-300 text-gray-700 rounded-md"
      >
        Cancelar
      </button>
    </form>
  );
};

export default CreateProduct;
