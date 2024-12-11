import React, { useState, useEffect } from "react";
import categoryService from "../../services/category/categoryService";

const UpdateCategory = ({ category, onUpdate, onClose }) => {
  const [name, setName] = useState(category.name);

  useEffect(() => {
    setName(category.name);
  }, [category]);

  const handleUpdate = async () => {
    try {
      const updatedCategory = await categoryService.updateCategory(category.id, { name });
      onUpdate(updatedCategory);
    } catch (error) {
      console.error("Error updating category:", error);
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
        <button onClick={handleUpdate} className="px-4 py-2 bg-orange2 text-white rounded-md">
          Actualizar
        </button>
        <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default UpdateCategory;
