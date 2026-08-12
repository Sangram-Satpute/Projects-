from typing import TypeVar, Generic
from repositories.base import BaseRepository

T = TypeVar('T')

class BaseService(Generic[T]):
    """Generic Service Layer interface encapsulating core business rules."""
    def __init__(self, repository: BaseRepository):
        self.repository = repository

    def get(self, id_val):
        return self.repository.get_by_id(id_val)

    def list_all(self):
        return self.repository.get_all()

    def create(self, data: dict):
        return self.repository.create(**data)

    def update(self, id_val, data: dict):
        instance = self.repository.get_by_id(id_val)
        if not instance:
            raise ValueError(f"Instance with id {id_val} not found")
        return self.repository.update(instance, **data)

    def delete(self, id_val):
        instance = self.repository.get_by_id(id_val)
        if instance:
            self.repository.delete(instance)
