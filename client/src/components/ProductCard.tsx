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
        <div className="relative w-64 rounded-[32px] overflow-hidden shadow-lg hover:cursor-pointer hover:-translate-y-1 hover:scale-80 transition ease-in-out">
            <img
                src={imageUrl}
                alt={name}
                className="w-full h-[20rem] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-end p-4 text-white hover:bg-opacity-40 duration-300">
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-sm font-medium">{brand}</p>
                <div className="mt-2">
                    <p className="text-sm font-semibold">
                        Price:{" "}
                        <span className="text-lg font-semibold">${price}</span>{" "}
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
