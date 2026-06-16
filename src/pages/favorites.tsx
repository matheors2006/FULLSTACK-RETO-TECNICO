import { useFavorites } from '../hooks/useFavorites';
import PokemonCard from '../components/pokemonCard';

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '2rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '1rem' }}>
        <h1 style={{ margin: 0, color: 'var(--text-main)' }}>Mis Pokémon Favoritos</h1>
      </div>
      
      {favorites.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <span style={{ fontSize: '4rem' }}>🎒</span>
          <h2 style={{ color: '#4a5568' }}>Tu mochila está vacía</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Aún no has capturado ningún Pokémon favorito. ¡Vuelve al inicio y añade algunos haciendo clic en el corazón!
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {favorites.map(pokemon => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      )}
    </main>
  );
}