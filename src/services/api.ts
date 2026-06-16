import type { PokemonListResponse, PokemonDetail, TypeListResponse, PokemonResult } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

// 1. Obtener listado de Pokémon (con límite y offset para paginación)
export const getPokemons = async (limit: number = 20, offset: number = 0): Promise<PokemonListResponse> => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) throw new Error('Error al cargar la lista de Pokémon');
  return response.json();
};

// 2. Obtener el detalle de un Pokémon específico (por ID o nombre)
export const getPokemonDetail = async (idOrName: string | number): Promise<PokemonDetail> => {
  const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
  if (!response.ok) throw new Error(`Error al cargar los detalles de ${idOrName}`);
  return response.json();
};

// 3. Obtener la lista de tipos de Pokémon (Bonus)
export const getTypes = async (): Promise<TypeListResponse> => {
  const response = await fetch(`${BASE_URL}/type`);
  if (!response.ok) throw new Error('Error al cargar los tipos');
  return response.json();
};

export const getPokemonsByType = async (type: string): Promise<PokemonResult[]> => {
  const response = await fetch(`${BASE_URL}/type/${type}`);
  if (!response.ok) throw new Error(`Error al cargar el tipo ${type}`);
  const data = await response.json();
  // La API devuelve la estructura { pokemon: { name, url } } dentro de un array.
  // Lo mapeamos para que coincida exactamente con nuestra interfaz PokemonResult.
  return data.pokemon.map((p: { pokemon: PokemonResult }) => p.pokemon);
};