import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CarouselSection from "../components/CarouselSection";
import ProductCard from "../components/ProductCard";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { fetchProducts } from "../services/productService";
import { CircularProgress } from "@mui/material";


function HomePage() {
    interface Product {
        name: string;
        link: string;
        price: string;
    }

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts(1);
                setProducts(data);
            } catch (err) {
                setError('Failed to load products. ' + err);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);


    return (
        <div className="bg-white">
            <Header />

            <div className="flex bg-gray-100 py-2 text-center text-sm text-gray-600 w-full">
                <div className="flex gap-4 animate-infinite-scroll-reverse">
                    <span className="px-4">Limited Time Offer: Free throw pillows with sofa purchases</span>
                    <span className="px-4">Free Shipping on orders over $200</span>
                    <span className="px-4">Sofas 15% off - Use code COZY15</span>
                    <span className="px-4">Milk starting at $2</span>

                </div>
            </div>

            <CarouselSection />

            <div className="py-10 overflow-hidden flex">
                <div className="flex gap-6 animate-infinite-scroll">
                    {loading ? (
                        <CircularProgress />
                    ) : error ? (
                        <div className="text-red-500">{error}</div>
                    ) : (
                        [...products, ...products].map((product, index) => (
                            <ProductCard
                                key={index}
                                imageUrl={product.link}
                                name={product.name}
                                brand="Brand name"
                                price={product.price}
                                originalPrice="10"
                            />
                        ))
                    )}


                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-8 bg-white shadow-md rounded-lg mt-10 border-t">
                {/* Left Section */}
                <div className="flex-none w-[30rem]">
                    <h2 className="text-6xl font-bold text-gray-800 mb-4">Furnish Every Corner</h2>
                    <p className="text-gray-600 mb-6 font-semibold">
                        From elegant dining room furniture to cozy bedroom sets, our collections
                        cover every corner of your home. Discover high-quality pieces for every room.
                    </p>
                    <button className="px-6 py-3 bg-black text-white rounded-md hover:bg-white transition hover:text-black hover:border border-transparent hover:border-black">
                        Explore collections
                    </button>
                </div>

                {/* Image Section */}
                <div className="flex-initial w-full h-[30rem] flex items-center justify-start gap-10">
                    <div className="w-1/2 h-[30rem] overflow-hidden object-cover">
                        <img
                            src="https://urban-furniture-demo.myshopify.com/cdn/shop/files/Real-Genuine-cow-leather-bed-Soft-Beds-Bedroom-camas-lit-muebles-de-dormitorio-yatak-mobilya-quarto_jpg.webp?v=1713800018&width=1920"
                            alt="Dining Room Furniture"
                            className="rounded-lg shadow-md"
                        />
                    </div>

                    <div className="flex flex-col gap-4 text-2xl text-gray-800 w-full h-full justify-center">
                        <div className="flex justify-between items-center">
                            <h1>Luxury Sofa Set </h1>
                            <ArrowForwardIcon />
                        </div>
                        <div className="w-full h-[1px] bg-gray-400"></div>

                        <div className="flex justify-between items-center">
                            <h1>Shop Anytime </h1>
                            <ArrowForwardIcon />
                        </div>
                        <div className="w-full h-[1px] bg-gray-400"></div>

                        <div className="flex justify-between items-center">
                            <h1>Bedroom Furniture </h1>
                            <ArrowForwardIcon />
                        </div>
                        <div className="w-full h-[1px] bg-gray-400"></div>

                        <div className="flex justify-between items-center">
                            <h1>Dining Room </h1>
                            <ArrowForwardIcon />
                        </div>
                        <div className="w-full h-[1px] bg-gray-400"></div>
                    </div>
                </div>
            </div>

            <Footer />




        </div>
    );
}

export default HomePage;
