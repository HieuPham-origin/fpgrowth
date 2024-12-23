
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import RoundedButton from "../components/RoundedButton";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CarouselSection from "../components/CarouselSection";
import ProductCard from "../components/ProductCard";

function HomePage() {
    return (
        <div className="bg-white">
            <header className="flex items-center justify-between px-6 py-4 shadow-md">
                <nav className="flex space-x-6 text-gray-700">
                    <a href="#" className="relative group text-gray-700">
                        Home
                        <span className="header-underline"></span>
                    </a>
                    <a href="#" className="relative group text-gray-700">
                        New Arrivals
                        <span className="header-underline"></span>
                    </a>
                    <a href="#" className="relative group text-gray-700">
                        Collections
                        <span className="header-underline"></span>
                    </a>
                    <a href="#" className="relative group text-gray-700">
                        Resources
                        <span className="header-underline"></span>
                    </a>
                </nav>

                <div className="absolute left-1/2 transform -translate-x-1/2 bg-black ">
                    <h1 className="px-3 py-5 text-2xl font-bold text-white">
                        FPGrowth Shop
                    </h1>
                </div>

                <div className="flex items-center space-x-4">
                    <RoundedButton title="Sign up" onClick={() => { }} className="black_button" />
                    <RoundedButton title="Login" onClick={() => { }} className="bg-white hover:underline" />
                </div>
            </header>

            <div className="bg-gray-100 py-2 text-center text-sm text-gray-600">
                <span className="px-4">Limited Time Offer: Free throw pillows with sofa purchases</span>
                <span className="px-4">Free Shipping on orders over $200</span>
                <span className="px-4">Sofas 15% off - Use code COZY15</span>
                <span className="px-4">Dining Tables starting at $199</span>
            </div>

            <CarouselSection />

            <div className="flex justify-center items-center mt-2 ">
                <ProductCard
                    imageUrl="https://via.placeholder.com/200"
                    name="Comfortable Velvet Dining Chair"
                    brand="Qing-yun"
                    price="191.00"
                    originalPrice="200.00"
                />
            </div>



        </div>
    );
}

export default HomePage;
