import React, { useEffect, useState } from "react";
import categoryService from "../../services/category/categoryService";

const ProductView = ({ product }) => {
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        if (product.categoryId) {
          const category = await categoryService.getCategoryById(product.categoryId);
          setCategoryName(category.name);
        }
      } catch (error) {
        console.error("Error al obtener la categoría:", error);
      }
    };

    fetchCategory();
  }, [product.categoryId]);

  return (
    <div className="p-4">
      <h3 className="text-2xl font-semibold text-orange2">{product.name}</h3>
      <p className="mt-2 text-lg">Precio: ${product.price}</p>
      <p className="mt-2 text-lg">Stock: {product.stock}</p>
      <p className="mt-2 text-lg">Categoría: {categoryName || "Cargando..."}</p>
    </div>
  );
};

export default ProductView;
