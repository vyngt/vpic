from typing import TypeVar, Type, Optional
from django.db.models import Model, QuerySet


T = TypeVar("T", bound=Model)


class ModelOperator:
    @classmethod
    def extract(cls, **kwargs):
        single_fields = dict()
        many_fields = dict()
        for key, value in kwargs.items():
            if isinstance(value, (list, tuple, set)):
                many_fields[key] = value
            else:
                single_fields[key] = value
        return single_fields, many_fields

    @classmethod
    def get(cls, _model: Type[T], **kwargs) -> Optional[T]:
        try:
            obj = _model.objects.get(**kwargs)
        except _model.DoesNotExist:
            obj = None
        return obj

    @classmethod
    def filter_by_single_field(cls, _model: Type[T], **kwargs) -> QuerySet[T]:
        return _model.objects.filter(**kwargs)

    @classmethod
    def filter_by_many_fields(cls, _queryset: QuerySet[T], **kwargs) -> QuerySet[T]:
        for key, values in kwargs.items():
            for value in values:
                _queryset = _queryset.filter(**{key: value})
        return _queryset

    @classmethod
    def get_many(cls, _model: Type[T], **kwargs) -> QuerySet[T]:
        single_fields, many_fields = cls.extract(**kwargs)
        return cls.filter_by_many_fields(
            cls.filter_by_single_field(_model, **single_fields), **many_fields
        )
