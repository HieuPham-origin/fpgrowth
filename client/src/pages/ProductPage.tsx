import React from 'react'
import Header from '../components/Header'
import ProductCard2 from '../components/ProductCard2'
import { Breadcrumbs, FormControl, InputLabel, Link, NativeSelect, Typography } from '@mui/material'

function ProductPage() {
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
                <div className="flex pl-32 pr-32 pt-8">
                    <ProductCard2
                        image="https://www.morelandobgyn.com/hs-fs/hubfs/Feminine%20Hygiene%20Products.jpg?width=509&height=339&name=Feminine%20Hygiene%20Products.jpg"
                        altText="Modern Italian Living Room Décor"
                        status="In stock"
                        brand="Honey-Pet"
                        discount="Save $20.00"
                        name="Modern Italian Living Room Décor"
                        price="$290.00"
                        originalPrice="$310.00"
                        thumbnails={[
                            "https://www.morelandobgyn.com/hs-fs/hubfs/Feminine%20Hygiene%20Products.jpg?width=509&height=339&name=Feminine%20Hygiene%20Products.jpg",
                            "https://www.morelandobgyn.com/hs-fs/hubfs/Feminine%20Hygiene%20Products.jpg?width=509&height=339&name=Feminine%20Hygiene%20Products.jpg",
                            "https://www.morelandobgyn.com/hs-fs/hubfs/Feminine%20Hygiene%20Products.jpg?width=509&height=339&name=Feminine%20Hygiene%20Products.jpg",
                        ]}
                    />
                </div>
            </div>
        </>



    )
}

export default ProductPage