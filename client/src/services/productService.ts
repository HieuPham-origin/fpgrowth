import axios from 'axios';
import { ENDPOINTS } from '../utils/constants';

export const fetchProducts = async () => {
    try {
        const response = await axios.get(ENDPOINTS.GET_PRODUCTS);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};