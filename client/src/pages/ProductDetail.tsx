import { Breadcrumbs, Link, Typography, CircularProgress } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart, getProductRecommendation } from "../services/productService";
import ProductCard2 from "../components/ProductCard2";

interface Product {
  name: string;
  link: string;
  price: number;
}

const ProductDetail: React.FC = () => {
  const { productName } = useParams<{ productName: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleAddToCart = async (productName: string, quantity: number) => {
    try {
      await addToCart(productName, quantity);
    } catch (error) {
      console.error("Failed to add product to cart:", error);

    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        console.log(productName);
        if (!productName) return;
        setLoading(true);
        const response = await getProductRecommendation(encodeURIComponent(productName));
        const data = response.data.data;
        setProduct(data.product);
        setRecommendations(data.recommendations);
      } catch (err) {
        setError("Failed to load product details." + err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error || "Product not found."}
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex bg-gray-100 py-6 text-center text-sm text-gray-600 w-full p-4">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography sx={{ color: 'text.primary' }}>Products</Typography>
        </Breadcrumbs>
      </div>

      <div className="flex flex-wrap p-32">

        <div className="w-full md:w-3/4 flex justify-center">
          <img
            src={product.link}
            alt="Product"
            className="rounded-lg shadow-md w-3/4 h-3/4 object-cover"
          />
        </div>

        <div className="w-full md:w-1/4 mt-6 md:mt-0">
          <div className="border rounded-lg p-6 shadow-md">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-600 line-through">${product.price}</p>
            <p className="text-xl font-semibold text-green-600">$191.00</p>

            <div className="mt-4">
              <label className="block mb-2 font-medium">Select Color:</label>
              <div className="flex space-x-4">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Color Option"
                  className="border rounded-lg cursor-pointer"
                />
                <img
                  src="https://via.placeholder.com/50"
                  alt="Color Option"
                  className="border rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block mb-2 font-medium">Select Style:</label>
              <button className="px-4 py-2 bg-black text-white rounded-md">
                Modern Style
              </button>
            </div>

            <div className="mt-4">
              <label className="block mb-2 font-medium">Product Quantity:</label>
              <div className="flex items-center space-x-4">
                <button className="px-2 py-1 border rounded">-</button>
                <span>1</span>
                <button className="px-2 py-1 border rounded">+</button>
              </div>
              <p className="mt-2">Subtotal: $191.00</p>
            </div>

            <div className="mt-6 flex flex-col space-y-4">
              <button onClick={() => handleAddToCart(product.name, 1)} className="w-full px-4 py-2 bg-black text-white rounded-md">
                Add to Cart
              </button>
              <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-md">
                Buy with Shop Pay
              </button>
              <button className="w-full px-4 py-2 bg-green-500 text-white rounded-md">
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-32">
        <h2 className="text-2xl font-bold mb-4">Recommended Products</h2>
        <div className="flex flex-wrap gap-4">
          {recommendations.map((rec, index) => (
            <ProductCard2
              key={index}
              onCartClick={() => handleAddToCart(rec.name, 1)}
              image={rec.link}
              altText={rec.name}
              status="In stock"
              brand="Honey-Pet"
              discount="Save $20.00"
              name={rec.name}
              price={rec.price.toString()}
              originalPrice="$310.00"
              thumbnails={[rec.link, rec.link, rec.link]}
              isProductDetailPage={true} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetail;
