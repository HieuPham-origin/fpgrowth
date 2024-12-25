import axios from 'axios';
import { ENDPOINTS } from '../utils/constants';

export const fetchProducts = async (page: number | undefined) => {
    try {
        const response = await axios.get(`${ENDPOINTS.GET_PRODUCTS}?page=${page}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const getProductRecommendation = async (productName: string) => {
    try {
        const response = await axios.get(`${ENDPOINTS.GET_PRODUCTS}/${productName}`);
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error fetching product recommendation:", error);
        throw error;
    }
}

export const addToCart = async (productName: string, quantity: number) => {
    try {
        const userId = "sample_user_id"; // Thay "sample_user_id" bằng giá trị user ID thực tế hoặc giữ nguyên nếu là mẫu

        await axios.post(
            ENDPOINTS.CART,
            {
                product_name: productName,
                quantity: quantity,
            },
            {
                headers: {
                    "user-id": userId, 
                },
            }
        );
        
    } catch (error) {
        console.error("Error adding product to cart:", error);
        throw error;
    }
};
