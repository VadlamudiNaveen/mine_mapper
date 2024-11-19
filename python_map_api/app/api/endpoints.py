from fastapi import APIRouter, HTTPException
from app.models.item import Item, items_db
from app.schemas.item_schema import ItemSchema

router = APIRouter()

@router.post("/items/", response_model=ItemSchema)
def create_item(item: ItemSchema):
    new_item = Item(**item.dict())
    items_db.append(new_item)
    return new_item

@router.get("/items/{item_id}", response_model=ItemSchema)
def read_item(item_id: int):
    for item in items_db:
        if item.id == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")

@router.put("/items/{item_id}", response_model=ItemSchema)
def update_item(item_id: int, item: ItemSchema):
    for idx, existing_item in enumerate(items_db):
        if existing_item.id == item_id:
            items_db[idx] = Item(**item.dict())
            return items_db[idx]
    raise HTTPException(status_code=404, detail="Item not found")

@router.delete("/items/{item_id}")
def delete_item(item_id: int):
    global items_db
    items_db = [item for item in items_db if item.id != item_id]
    return {"detail": "Item deleted"}
