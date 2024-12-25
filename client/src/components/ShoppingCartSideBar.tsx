import React, { useState, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

interface ShoppingCartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

interface CartItem {
    product_name: string;
    quantity: number;
}

const ENDPOINTS = {
    CART: "http://127.0.0.1:8000/cart", // Thay URL nếu cần
};

const ShoppingCartSidebar: React.FC<ShoppingCartSidebarProps> = ({ isOpen, onClose }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const userId = "sample_user_id"; // Thay bằng giá trị thật nếu cần

    const fetchCartItems = async () => {
        try {
            setLoading(true);
            const response = await axios.get(ENDPOINTS.CART, {
                headers: { "user-id": userId },
            });
            setCartItems(response.data.cart || []);
        } catch (err) {
            setError("Failed to load cart items.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const removeItem = async (productName: string) => {
        try {
            await axios.delete(ENDPOINTS.CART, {
                headers: { "user-id": userId },
                params: { product_name: productName },
            });
            // Update cart state after removal
            setCartItems((prev) => prev.filter((item) => item.product_name !== productName));
        } catch (err) {
            console.error("Failed to remove item:", err);
        }
    };

    useEffect(() => {
        if (isOpen) fetchCartItems();
    }, [isOpen]);

    return (
        <div
            className={`fixed z-10 top-0 right-0 h-full w-96 bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-300 ease-in-out`}
        >
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold">Shopping Cart</h2>
                <button onClick={onClose} className="text-gray-600 hover:text-black">
                    <CloseIcon />
                </button>
            </div>
            <div className="p-4">
                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : cartItems.length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                ) : (
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index} className="flex justify-between items-center mb-4">
                                <div>
                                    <p className="font-bold">{item.product_name}</p>
                                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                                </div>
                                <button
                                    onClick={() => removeItem(item.product_name)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <DeleteIcon />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="p-4 border-t">
                <button className="w-full bg-black text-white py-2 rounded-md">
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default ShoppingCartSidebar;
