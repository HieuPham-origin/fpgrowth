import React from "react";

type CartButtonProps = {
  onClick: () => void;
  className?: string;
};



const CartButton = ({ onClick, className = '' }: CartButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full shadow-md hover:bg-gray-800 transition ${className}`}>
      {/* Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6m1.2-6h10m-10 0L5.4 7M21 21a2 2 0 100-4 2 2 0 000 4zm-14 0a2 2 0 100-4 2 2 0 000 4z"
        />
      </svg>
      {/* Text */}
      <span className="font-semibold">Go to Cart</span>
    </button>
  );
};

export default CartButton;
