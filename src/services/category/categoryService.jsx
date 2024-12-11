import axios from "axios";
import { apiUrl } from "../ApiUrl"; 

const categoryService = {
  async getAllCategories(params) {
    const response = await axios.get(`${apiUrl}/api/v1/categories`, { params });
    return response.data;
  },

  async getCategoryById(categoryId) {
    const response = await axios.get(`${apiUrl}/api/v1/category/${categoryId}`);
    return response.data;
  },

  async createCategory(formData) {
    const response = await axios.post(`${apiUrl}/api/v1/category`, formData, {
      headers: {
        "Content-Type": "application/json", 
      },
    });
    return response.data;
  },

  async updateCategory(categoryId, formData) {
    const response = await axios.put(`${apiUrl}/api/v1/category/${categoryId}`, formData, {
      headers: {
        "Content-Type": "application/json", 
      },
    });
    return response.data;
  },

  async deleteCategory(categoryId) {
    const response = await axios.delete(`${apiUrl}/api/v1/category/${categoryId}`);
    return response.data;
  },
};

export default categoryService;
