class _scope:
    def __enter__(self):
        # no setup needed
        return None

    def __exit__(self, exc_type, exc_value, traceback):
        # no cleanup needed
        return False  # don't suppress exceptions
    
scope = _scope()


from dataclasses import dataclass, field
from typing import Type, TypeVar, Dict, Callable, Union, cast

E = TypeVar('E')

class TypeMap:
    _default_factories: Dict[Type, Callable[[], object]] = {}

    def __init__(self) -> None:
        self._store: Dict[Type, object] = {}

    def __getitem__(self, key: Type[E]) -> E:
        if key in self._store:
            return cast(E, self._store[key])
        if key in self._default_factories:
            value = self._default_factories[key]()
            self._store[key] = value
            return cast(E, value)
        raise KeyError(f"No entry or default factory registered for {key}")
    
    def maybe(self, key: Type[E]) -> E | None:
        if key in self._store:
            return cast(E, self._store[key])
        return None

    def __setitem__(self, key: Type[E], value: E) -> None:
        self._store[key] = value

    @classmethod
    def register(cls, key: Type[E]) -> Callable[[Callable[[], E]], Callable[[], E]]:
        def decorator(factory: Callable[[], E]) -> Callable[[], E]:
            cls._default_factories[key] = factory
            return factory
        return decorator