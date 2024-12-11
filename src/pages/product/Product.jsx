import React, { useState, useEffect } from "react";
import Modal from "../../components/modal/Modal";
import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct";
import ProductView from "./ProductView";
import { BiSolidShow, BiEdit } from "react-icons/bi";
import productService from "../../services/product/productService";
import categoryService from "../../services/category/categoryService";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await productService.getAllProducts();
        if (Array.isArray(data)) {
          const updatedProducts = await Promise.all(
            data.map(async (product) => {
              if (product.categoryId) {
                try {
                  const category = await categoryService.getCategoryById(product.categoryId);
                  return { ...product, categoryName: category.name }; 
                } catch (error) {
                  console.error("Error al obtener la categoría:", error);
                  return { ...product, categoryName: "Categoría no encontrada" };
                }
              }
              return { ...product, categoryName: "Sin categoría" }; 
            })
          );
          setProducts(updatedProducts); 
        } else {
          console.error("La respuesta no contiene un array de productos:", data);
          setProducts([]); 
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); 
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  

  

  const openModal = (type, product = null) => {
    setSelectedProduct(product);
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedProduct(null);
  };

  const handleCreate = async (newProduct) => {
    try {
      if (newProduct.categoryId) {
        const category = await categoryService.getCategoryById(newProduct.categoryId);
        newProduct.categoryName = category.name; 
      } else {
        newProduct.categoryName = "Sin categoría";
      }
      setProducts((prevProducts) => [newProduct, ...prevProducts]);
      closeModal();
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };
  

  const handleUpdate = async (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    closeModal();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between border-b-2 border-orange2 pb-3 items-center">
        <h2 className="text-3xl font-medium text-orange2">Lista de Productos</h2>
        <button
          onClick={() => openModal("create")}
          className="px-4 py-2 bg-orange2 text-white rounded-md"
        >
          Crear Producto
        </button>
      </div>

      <table className="min-w-full bg-white border mt-4 border-gray-200 rounded shadow-md table-striped">
        <thead className="bg-orange2 text-white text-xl rounded-3xl">
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Stock</th>
            <th className="py-2 px-4 border-b">Precio</th>
            <th className="py-2 px-4 border-b">Categoría</th>
            <th className="py-2 px-4 border-b">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3" className="text-center p-4 text-orange2">
                Cargando productos...
              </td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center p-4 text-orange2">
                No hay productos.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">{product.stock}</td>
                <td className="py-2 px-4 border-b">S/. {product.price}</td>
                <td className="py-2 px-4 border-b">{product.categoryName}</td> 
                <td className="py-2 px-4 border-b flex justify-center items-center gap-2">
                  <BiSolidShow
                    onClick={() => openModal("view", product)}
                    className="text-3xl text-orange2 hover:text-orange1 cursor-pointer"
                  />
                  <BiEdit
                    onClick={() => openModal("edit", product)}
                    className="text-3xl text-orange2 hover:text-orange1 cursor-pointer"
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          modalType === "create"
            ? "Crear Producto"
            : modalType === "edit"
            ? "Editar Producto"
            : "Detalles de Producto"
        }
      >
        {modalType === "create" && <CreateProduct onCreate={handleCreate} onClose={closeModal} />}
        {modalType === "edit" && selectedProduct && (
          <UpdateProduct product={selectedProduct} onUpdate={handleUpdate} onClose={closeModal} />
        )}
        {modalType === "view" && selectedProduct && (
          <ProductView product={selectedProduct} />
        )}
      </Modal>
    </div>
  );
};

export default Product;
