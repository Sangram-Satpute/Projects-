from typing import Type, TypeVar, Optional, List
from django.db.models import Model

T = TypeVar('T', bound=Model)

class BaseRepository:
    """Generic Repository Pattern interface decoupling database operations from service layer."""
    def __init__(self, model_class: Type[T]):
        self.model_class = model_class

    def get_by_id(self, id_val) -> Optional[T]:
        try:
            return self.model_class.objects.get(pk=id_val)
        except self.model_class.DoesNotExist:
            return None

    def get_all(self) -> List[T]:
        return list(self.model_class.objects.all())

    def create(self, **kwargs) -> T:
        return self.model_class.objects.create(**kwargs)

    def update(self, instance: T, **kwargs) -> T:
        for key, value in kwargs.items():
            setattr(instance, key, value)
        instance.save()
        return instance

    def delete(self, instance: T) -> None:
        if hasattr(instance, 'soft_delete'):
            instance.soft_delete()
        else:
            instance.delete()
