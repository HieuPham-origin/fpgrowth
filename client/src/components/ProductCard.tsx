import React from "react";

interface ProductCardProps {
    imageUrl: string;
    name: string;
    brand: string;
    price: string;
    originalPrice?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, name, brand, price, originalPrice }) => {
    return (
        <div className="relative w-64 rounded-xl overflow-hidden shadow-lg">
            <img
                src={imageUrl}
                alt={name}
                className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 text-white">
                {/* Product Name */}
                <h3 className="text-lg font-bold">{name}</h3>
                {/* Brand */}
                <p className="text-sm font-medium">{brand}</p>
                {/* Pricing */}
                <div className="mt-2">
                    <p className="text-sm">
                        Price:{" "}
                        <span className="text-lg font-bold">${price}</span>{" "}
                        {originalPrice && (
                            <span className="line-through text-gray-300 text-sm">
                                ${originalPrice}
                            </span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
