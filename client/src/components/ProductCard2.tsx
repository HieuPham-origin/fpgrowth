import React from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface ProductCard2Props {
    onCartClick: (productName: string, quantity: number) => void;
    image: string;
    altText: string;
    status: string;
    brand: string;
    discount: string;
    name: string;
    price: string;
    originalPrice: string;
    thumbnails: string[];
    isProductDetailPage?: boolean;
}


const ProductCard2: React.FC<ProductCard2Props> = ({
    onCartClick,
    image,
    altText,
    status,
    brand,
    discount,
    name,
    price,
    originalPrice,
    thumbnails,
    isProductDetailPage = false,
}) => {
    return (
        <div className="max-w-xs bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="relative w-full h-64 bg-gray-100">
                <img
                    src={image}
                    alt={altText}
                    className="w-[20rem] h-[16rem] object-cover"
                />
                <div className="absolute top-2 left-2 bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
                    {status}
                </div>
            </div>
            <div className="p-4">
                <div className="text-gray-500 text-sm mb-1">{brand}</div>
                <div className="text-red-500 text-xs mb-2">{discount}</div>
                <a
                    href={isProductDetailPage ? `${name}` : `products/${name}`}
                    className="text-lg font-semibold text-gray-800 mb-2 relative group">
                    {name}
                    <span className="header-underline"></span>
                </a>
                <div className="flex items-center space-x-2 mb-4">
                    <span className="text-xl font-bold text-gray-900">{price}</span>
                    <span className="line-through text-gray-400">{originalPrice}</span>
                </div>
                <div className="flex space-x-2 mb-4">
                    {thumbnails.map((thumbnail, index) => (
                        <img
                            key={index}
                            src={thumbnail}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-12 h-12 object-cover border border-gray-300 rounded cursor-pointer"
                        />
                    ))}
                </div>
                <div className="flex gap-2">
                    <button onClick={() => onCartClick(name, 1)} className="black_button flex-1 px-6 py-2 rounded-full font-semibold transition-colors border border-transparent inline-block w-full text-center">
                        ADD TO CART
                    </button>
                    <div className="rounded-full p-2 border hover:bg-black hover:cursor-pointer duration-300 group">
                        <RemoveRedEyeIcon className="text-black cursor-pointer group-hover:text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard2;
