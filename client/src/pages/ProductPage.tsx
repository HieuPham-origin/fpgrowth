import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProductCard2 from '../components/ProductCard2'
import { Breadcrumbs, CircularProgress, FormControl, Link, NativeSelect, Typography } from '@mui/material'
import { fetchProducts } from '../services/productService';

function ProductPage() {
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
                const data = await fetchProducts();
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
                                name: 'age',
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
                        products.map((product) => (
                            <ProductCard2
                                key={product.name}
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
            </div>
        </>



    )
}

export default ProductPage