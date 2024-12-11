import axios from "axios";
import { apiUrl } from "../ApiUrl"; 

const productService = {
  async getAllProducts(params) {
    const response = await axios.get(`${apiUrl}/api/v1/products`, { params });
    return response.data;
  },

  async getProductById(productId) {
    const response = await axios.get(`${apiUrl}/api/v1/product/${productId}`);
    return response.data;
  },

  async createProduct(formData) {
    const response = await axios.post(`${apiUrl}/api/v1/product`, formData, {
      headers: {
        "Content-Type": "application/json", 
      },
    });
    return response.data;
  },

  async updateProduct(productId, formData) {
    const response = await axios.put(`${apiUrl}/api/v1/product/${productId}`, formData, {
      headers: {
        "Content-Type": "application/json", 
      },
    });
    return response.data;
  },

  async deleteProduct(productId) {
    const response = await axios.delete(`${apiUrl}/api/v1/product/${productId}`);
    return response.data;
  },

};

export default productService;
