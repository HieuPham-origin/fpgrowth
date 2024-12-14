from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

# Khởi tạo ứng dụng FastAPI
app = FastAPI()

# Định nghĩa mô hình dữ liệu yêu cầu
class Item(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    tax: Optional[float] = None

# Route GET đơn giản
@app.get("/")
def read_root():
    return {"message": "Hello, World"}

# Route GET với tham số query
@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}

# Route POST nhận dữ liệu JSON và trả lại phản hồi
@app.post("/items/")
def create_item(item: Item):
    return {"name": item.name, "price": item.price, "tax": item.tax}

# Route PUT để cập nhật thông tin item
@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_id": item_id, "updated_item": item}
