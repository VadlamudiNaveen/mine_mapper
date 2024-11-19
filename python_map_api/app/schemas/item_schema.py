from pydantic import BaseModel
from typing import Optional

class ItemSchema(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
