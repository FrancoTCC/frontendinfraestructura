import React, { useState, useEffect } from "react";
import Modal from "../../components/modal/Modal";
import CreateCategory from "./CreateCategory";
import UpdateCategory from "./UpdateCategory";
import { BiSolidShow, BiEdit } from "react-icons/bi";
import categoryService from "../../services/category/categoryService";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await categoryService.getAllCategories();
        if (Array.isArray(data)) {
          setCategories(data); 
        } else {
          console.error("La respuesta no contiene un array de categorías:", data);
          setCategories([]); 
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const openModal = (type, category = null) => {
    setSelectedCategory(category);
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedCategory(null);
  };

  const handleCreate = async (newCategory) => {
    setCategories((prevCategories) => [newCategory, ...prevCategories]);
    closeModal();
  };

  const handleUpdate = async (updatedCategory) => {
    const updatedCategories = categories.map((category) =>
      category.id === updatedCategory.id ? updatedCategory : category
    );
    setCategories(updatedCategories);
    closeModal();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between border-b-2 border-orange2 pb-3 items-center">
        <h2 className="text-3xl font-medium text-orange2">Lista de Categorías</h2>
        <button
          onClick={() => openModal("create")}
          className="px-4 py-2 bg-orange2 text-white rounded-md"
        >
          Crear Categoría
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded shadow-md table-striped">
        <thead className="bg-orange2 text-white text-xl rounded-3xl">
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="2" className="text-center p-4 text-orange2">
                Cargando categorías...
              </td>
            </tr>
          ) : categories.length === 0 ? (
            <tr>
              <td colSpan="2" className="text-center p-4 text-orange2">
                No hay categorías.
              </td>
            </tr>
          ) : (
            categories.map((category) => (
              <tr key={category.id} className="text-center">
                <td className="py-2 px-4 border-b">{category.name}</td>
                <td className="py-2 px-4 border-b flex justify-center items-center gap-2">
                  <BiSolidShow
                    onClick={() => openModal("view", category)}
                    className="text-3xl text-orange2 hover:text-orange1 cursor-pointer"
                  />
                  <BiEdit
                    onClick={() => openModal("edit", category)}
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
            ? "Crear Categoría"
            : modalType === "edit"
            ? "Editar Categoría"
            : "Detalles de Categoría"
        }
      >
        {modalType === "create" && <CreateCategory onCreate={handleCreate} onClose={closeModal} />}
        {modalType === "edit" && selectedCategory && (
          <UpdateCategory category={selectedCategory} onUpdate={handleUpdate} onClose={closeModal} />
        )}
        {modalType === "view" && selectedCategory && (
          <div>
            <h3>{selectedCategory.name}</h3>
            <p>Detalles de la categoría</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Category;
