import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ProductCard2 from '../components/ProductCard2';
import { Breadcrumbs, CircularProgress, FormControl, Link, NativeSelect, Pagination, Typography } from '@mui/material';
import { addToCart, fetchProducts } from '../services/productService';
import Footer from '../components/Footer';

function ProductPage() {
    interface Product {
        name: string;
        link: string;
        price: string;
    }

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const itemsPerPage = 10;
    const totalProducts = 167;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const loadProducts = async (pageNumber: number) => {
        try {
            setLoading(true);
            const data = await fetchProducts(pageNumber);
            setProducts(data);
        } catch (err) {
            setError('Failed to load products. ' + err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts(page);
    }, [page]);


    const handleAddToCart = async (productName: string, quantity: number) => {
        try {
            await addToCart(productName, quantity);
        } catch (error) {
            console.error("Failed to add product to cart:", error);

        }
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

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
            <div className='flex flex-col'>
                <div className="flex justify-between items-center pl-32 pt-12 pr-32">
                    <div className='font-bold text-2xl '>PRODUCT PAGE</div>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <NativeSelect
                            defaultValue={1}
                            inputProps={{
                                name: 'sort',
                                id: 'uncontrolled-native',
                            }}
                        >
                            <option value={1}>Featured</option>
                            <option value={2}>Best Selling</option>
                            <option value={3}>Low to High</option>
                            <option value={4}>High to Low</option>
                        </NativeSelect>
                    </FormControl>
                </div>

                <div className="flex flex-wrap gap-4 pl-32 pr-32 pt-8 justify-center">
                    {loading ? (
                        <CircularProgress />
                    ) : error ? (
                        <div className="text-red-500">{error}</div>
                    ) : (
                        products.map((product, index) => (
                            <ProductCard2
                                key={index}
                                onCartClick={() => handleAddToCart(product.name, 1)}
                                image={product.link}
                                altText={product.name}
                                status="In stock"
                                brand="Honey-Pet"
                                discount="Save $20.00"
                                name={product.name}
                                price={product.price}
                                originalPrice="$310.00"
                                thumbnails={[product.link, product.link, product.link]}
                            />
                        ))
                    )}
                </div>

                <Pagination count={totalPages} page={page} onChange={handlePageChange} className='my-4 mx-auto' />
            </div>

            <Footer />
        </>
    );
}

export default ProductPage;
