import React, { useState } from "react";
import categoryService from "../../services/category/categoryService";

const CreateCategory = ({ onCreate, onClose }) => {
  const [name, setName] = useState("");

  const handleCreate = async () => {
    try {
      const newCategory = await categoryService.createCategory({ name });
      onCreate(newCategory);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div>
      <div>
        <label>Nombre de la Categoría</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <div className="flex gap-4 mt-4">
        <button onClick={handleCreate} className="px-4 py-2 bg-orange2 text-white rounded-md">
          Crear
        </button>
        <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default CreateCategory;
