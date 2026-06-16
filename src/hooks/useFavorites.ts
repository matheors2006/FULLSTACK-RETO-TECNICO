import { useState, useEffect } from 'react';
import type { PokemonResult } from '../types/pokemon';

export const useFavorites = () => {
  // Inicializamos el estado leyendo el localStorage
  const [favorites, setFavorites] = useState<PokemonResult[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Sincronizamos con localStorage cada vez que el estado cambia
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemon: PokemonResult) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.name === pokemon.name);
      if (exists) {
        return prev.filter((p) => p.name !== pokemon.name);
      }
      return [...prev, pokemon];
    });
  };

  const isFavorite = (name: string) => {
    return favorites.some((p) => p.name === name);
  };

  return { favorites, toggleFavorite, isFavorite };
};