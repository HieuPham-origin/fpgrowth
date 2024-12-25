from fastapi import FastAPI, Query, HTTPException, Header
from pydantic import BaseModel
from typing import List, Dict
import pandas as pd
from fpgrowth import FPGrowth
from fastapi.middleware.cors import CORSMiddleware

df = pd.read_csv('basket.csv', sep=';')
fpgrowth = FPGrowth(0.001, 0.1)
fpgrowth.fit(df)
association_rules = pd.read_csv('association_rules.csv', sep=';')
app = FastAPI()

products = pd.read_csv('products.csv')
user_carts: Dict[str, List[Dict]] = {}

class Product(BaseModel):
    name: str
    link: str
    price: int

class CartItem(BaseModel):
    product_name: str
    quantity: int

class ProductDetailResponse(BaseModel):
    status: str
    response_code: int
    data: dict


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/products", response_model=dict)
def get_products(page: int = Query(1, ge=1), size: int = Query(10, ge=1)):
    start = (page - 1) * size
    end = start + size
    products_slice = products.iloc[start:end]

    if products_slice.empty:
        return {
            "status": "error",
            "response_code": 404,
            "message": "No products found on this page.",
            "data": []
        }

    data = [
        {
            "name": row["Product"],
            "link": row["Image Link"],
            "price": row["Price"]
        }
        for _, row in products_slice.iterrows()
    ]

    return {
        "status": "success",
        "response_code": 200,
        "data": data
    }

@app.post("/cart", response_model=dict)
def add_to_cart(item: CartItem, user_id: str = Header(...)):
    product = products[products["Product"] == item.product_name]
    if product.empty:
        raise HTTPException(status_code=404, detail="Product not found")

    if user_id not in user_carts:
        user_carts[user_id] = []

    user_carts[user_id].append({"product_name": item.product_name, "quantity": item.quantity})

    return {
        "status": "success",
        "message": f"Added {item.quantity} of {item.product_name} to cart.",
        "cart": user_carts[user_id]
    }

@app.get("/cart", response_model=dict)
def view_cart(user_id: str = Header(...)):
    if user_id not in user_carts or not user_carts[user_id]:
        return {
            "status": "success",
            "message": "Your cart is empty.",
            "cart": []
        }

    return {
        "status": "success",
        "cart": user_carts[user_id]
    }

@app.delete("/cart", response_model=dict)
def remove_from_cart(product_name: str, user_id: str = Header(...)):
    if user_id not in user_carts:
        raise HTTPException(status_code=404, detail="Cart not found")

    user_carts[user_id] = [item for item in user_carts[user_id] if item["product_name"] != product_name]

    return {
        "status": "success",
        "message": f"Removed {product_name} from cart.",
        "cart": user_carts[user_id]
    }

@app.get("/products/{product_name}", response_model=ProductDetailResponse)
def get_product_with_recommendations(product_name: str):
    product_name_normalized = product_name.strip().lower()

    product_data = products[products["Product"].str.lower() == product_name_normalized]
    if product_data.empty:
        raise HTTPException(status_code=404, detail="Product not found")

    product = Product(
        name=product_data.iloc[0]["Product"],
        link=product_data.iloc[0]["Image Link"],
        price=product_data.iloc[0]["Price"]
    )

    relevant_rules = association_rules[
        association_rules["Antecedent"].str.lower() == product_name_normalized
    ]
    recommended_products = relevant_rules["Consequent"].unique()

    recommendations = []
    for rec_product_name in recommended_products:
        rec_product_data = products[products["Product"].str.lower() == rec_product_name.lower()]
        if not rec_product_data.empty:
            recommendations.append(Product(
                name=rec_product_data.iloc[0]["Product"],
                link=rec_product_data.iloc[0]["Image Link"],
                price=rec_product_data.iloc[0]["Price"]
            ))

    return {
        "status": "success",
        "response_code": 200,
        "data": {
            "product": product,
            "recommendations": recommendations
        }
    }