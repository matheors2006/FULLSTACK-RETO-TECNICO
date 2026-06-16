import { useState, useEffect } from 'react';
import { getPokemons, getTypes, getPokemonsByType } from '../services/api';
import type { PokemonResult } from '../types/pokemon';
import PokemonCard from '../components/pokemonCard';
import Loader from '../components/loader';

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const LIMIT = 20;

  // Estados para el filtro por Tipos
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [allTypeFilteredPokemons, setAllTypeFilteredPokemons] = useState<PokemonResult[]>([]);

  // 1. Cargar los tipos disponibles
  useEffect(() => {
    getTypes()
      .then(data => setAvailableTypes(data.results.map(t => t.name)))
      .catch(console.error);
  }, []);

  // 2. Cargar Pokémon dependiendo de los filtros
  useEffect(() => {
    setLoading(true);
    setError(null);

    if (selectedTypes.length === 0) {
      // MODO NORMAL
      getPokemons(LIMIT, offset)
        .then(data => {
          setPokemons(data.results);
          setAllTypeFilteredPokemons([]);
        })
        .catch(() => setError('Error al cargar la Pokédex.'))
        .finally(() => setLoading(false));
    } else {
      // MODO FILTRADO (Intersección estricta para 2 tipos)
      Promise.all(selectedTypes.map(type => getPokemonsByType(type)))
        .then(results => {
          let filteredResult: PokemonResult[] = [];

          if (results.length === 1) {
            // Solo un tipo seleccionado, mostramos todos los de ese tipo
            filteredResult = results[0];
          } else if (results.length === 2) {
            // Dos tipos seleccionados: Buscamos la intersección (AND)
            const [firstTypePokemons, secondTypePokemons] = results;
            
            // Usamos un Set para búsquedas de alta eficiencia O(1)
            const secondTypeNames = new Set(secondTypePokemons.map(p => p.name));
            
            // Filtramos conservando solo los que están en ambos grupos
            filteredResult = firstTypePokemons.filter(p => secondTypeNames.has(p.name));
          }

          setAllTypeFilteredPokemons(filteredResult);
          setPokemons(filteredResult.slice(offset, offset + LIMIT));
        })
        .catch(() => setError('Error al filtrar por tipos.'))
        .finally(() => setLoading(false));
    }
  }, [selectedTypes, offset]);

  // Manejador estricto para máximo 2 tipos
  const toggleType = (type: string) => {
    setSelectedTypes(prev => {
      // Si ya está seleccionado, lo quitamos
      if (prev.includes(type)) return prev.filter(t => t !== type);
      
      // Si ya hay 2 seleccionados, no permitimos añadir más
      if (prev.length >= 2) return prev;
      
      // Si hay menos de 2, lo añadimos
      return [...prev, type];
    });
    setOffset(0); // Reiniciar paginación
  };

  const filteredPokemons = pokemons.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isNextDisabled = selectedTypes.length > 0 
    ? offset + LIMIT >= allTypeFilteredPokemons.length 
    : pokemons.length < LIMIT;

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'inherit' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ margin: 0, color: 'var(--text-main)' }}>Pokédex</h1>
        <input
          type="text"
          placeholder="Buscar en esta página..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e0', minWidth: '280px', fontSize: '1rem' }}
        />
      </div>

      {/* Filtro Múltiple de Tipos */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
          Filtrar por Tipo (Máximo 2 para buscar combinaciones):
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {availableTypes.map(type => {
            const isSelected = selectedTypes.includes(type);
            // Deshabilitar visualmente si ya hay 2 y este no es uno de ellos
            const isDisabled = selectedTypes.length >= 2 && !isSelected;

            return (
              <button
                key={type}
                onClick={() => toggleType(type)}
                disabled={isDisabled}
                style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: '20px',
                  border: `1px solid ${isSelected ? 'var(--primary)' : isDisabled ? '#e2e8f0' : '#cbd5e0'}`,
                  background: isSelected ? 'var(--primary)' : isDisabled ? '#f7fafc' : 'white',
                  color: isSelected ? 'white' : isDisabled ? '#a0aec0' : '#4a5568',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  textTransform: 'capitalize',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  opacity: isDisabled ? 0.6 : 1
                }}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {error && <p style={{ color: '#e53e3e', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}

      {loading ? (
        <Loader />
      ) : (
        <>
          {filteredPokemons.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '2rem' }}>
              No se encontraron Pokémon con esa combinación exacta.
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {filteredPokemons.map(pokemon => (
                <PokemonCard key={pokemon.name} pokemon={pokemon} />
              ))}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem' }}>
            <button
              onClick={() => setOffset(prev => Math.max(0, prev - LIMIT))}
              disabled={offset === 0}
              style={{ 
                padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', 
                background: offset === 0 ? '#cbd5e0' : 'var(--primary)', 
                color: 'white', cursor: offset === 0 ? 'not-allowed' : 'pointer',
                fontWeight: 'bold', fontSize: '1rem'
              }}
            >
              Anterior
            </button>
            <button
              onClick={() => setOffset(prev => prev + LIMIT)}
              disabled={isNextDisabled}
              style={{ 
                padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', 
                background: isNextDisabled ? '#cbd5e0' : 'var(--primary)', 
                color: 'white', cursor: isNextDisabled ? 'not-allowed' : 'pointer',
                fontWeight: 'bold', fontSize: '1rem'
              }}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </main>
  );
}