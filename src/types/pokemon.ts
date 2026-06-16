// Interfaz para la respuesta del paginado de Pokémon
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResult[];
}

// Interfaz para cada elemento en la lista general
export interface PokemonResult {
  name: string;
  url: string;
}

// Interfaz para el detalle individual de cada Pokémon
export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other?: {
      'official-artwork'?: {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

// Interfaz para la lista de tipos (Bonus)
export interface TypeListResponse {
  results: {
    name: string;
    url: string;
  }[];
}