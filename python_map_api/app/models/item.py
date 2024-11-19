from typing import List

class Item:
    def __init__(self, id: int, name: str, description: str = None):
        self.id = id
        self.name = name
        self.description = description

items_db: List[Item] = []
