import React, { useState } from "react";
import RoundedButton from "./RoundedButton";
import CartButton from "./CartButton";
import ShoppingCartSidebar from "./ShoppingCartSideBar";

function Header() {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <>
            <header className="flex items-center justify-between px-6 py-4 shadow-md">
                <nav className="flex space-x-6 text-gray-700">
                    <a href="/" className="relative group text-gray-700">
                        Home
                        <span className="header-underline"></span>
                    </a>
                    <a href="#" className="relative group text-gray-700">
                        New Arrivals
                        <span className="header-underline"></span>
                    </a>
                    <a href="/products" className="relative group text-gray-700">
                        Products
                        <span className="header-underline"></span>
                    </a>
                    <a href="#" className="relative group text-gray-700">
                        Resources
                        <span className="header-underline"></span>
                    </a>
                </nav>

                <div className="absolute left-1/2 transform -translate-x-1/2 bg-black">
                    <h1 className="px-3 py-5 text-2xl font-bold text-white">
                        FPGrowth Shop
                    </h1>
                </div>

                <div className="flex items-center space-x-4">
                    <RoundedButton title="Sign up" onClick={() => { }} className="black_button" />
                    <RoundedButton title="Login" onClick={() => { }} className="bg-white hover:underline" />
                    <CartButton onClick={toggleCart} />
                </div>
            </header>

            {/* Shopping Cart Sidebar */}
            <ShoppingCartSidebar isOpen={isCartOpen} onClose={toggleCart} />
        </>
    );
}

export default Header;
