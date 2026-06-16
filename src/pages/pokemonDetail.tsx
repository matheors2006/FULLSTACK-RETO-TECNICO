import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonDetail } from '../services/api';
import type { PokemonDetail as PokemonDetailType } from '../types/pokemon';
import Loader from '../components/loader';

export default function PokemonDetail() {
  const { id } = useParams<{ id: string }>(); // 'id' será el nombre del Pokémon por cómo configuramos la ruta
  const navigate = useNavigate();
  const [detail, setDetail] = useState<PokemonDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getPokemonDetail(id)
      .then(data => setDetail(data))
      .catch(() => setError('Error al cargar la información del Pokémon.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  
  if (error || !detail) {
    return (
      <main style={{ textAlign: 'center', padding: '2rem', fontFamily: 'system-ui' }}>
        <p style={{ color: '#e53e3e', fontWeight: 'bold' }}>{error || 'No se encontró el Pokémon'}</p>
        <button onClick={() => navigate(-1)} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>← Volver</button>
      </main>
    );
  }

  // Priorizamos arte oficial sobre sprite pixelado
  const image = detail.sprites.other?.['official-artwork']?.front_default || detail.sprites.front_default;

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ 
          padding: '0.5rem 1.5rem', background: '#e2e8f0', border: 'none', 
          borderRadius: '8px', cursor: 'pointer', marginBottom: '2rem',
          fontWeight: 'bold', color: '#4a5568'
        }}
      >
        ← Volver al listado
      </button>

      <div style={{ 
        display: 'flex', flexWrap: 'wrap', gap: '2rem', background: 'white', 
        padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' 
      }}>
        
        {/* Columna Izquierda: Imagen */}
        <div style={{ flex: '1 1 300px', background: '#f8f9fa', borderRadius: '12px', padding: '1rem', display: 'flex', justifyContent: 'center' }}>
          <img src={image} alt={detail.name} style={{ width: '100%', maxWidth: '300px', objectFit: 'contain' }} />
        </div>

        {/* Columna Derecha: Información */}
        <div style={{ flex: '1 1 300px' }}>
          <h1 style={{ textTransform: 'capitalize', fontSize: '2.5rem', marginTop: 0, color: 'var(--text-main)' }}>
            {detail.name}
          </h1>
          
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
            {detail.types.map(t => (
              <span key={t.type.name} style={{ background: 'var(--primary)', color: 'white', padding: '0.25rem 1rem', borderRadius: '20px', textTransform: 'capitalize', fontWeight: 'bold' }}>
                {t.type.name}
              </span>
            ))}
          </div>

          <h3 style={{ color: '#4a5568', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>Estadísticas Base</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            {detail.stats.map(s => (
              <div key={s.stat.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ textTransform: 'capitalize', fontWeight: '500', color: 'var(--text-muted)', width: '100px' }}>
                  {s.stat.name}
                </span>
                {/* Barra visual de la estadística */}
                <div style={{ flex: 1, background: '#e2e8f0', height: '10px', borderRadius: '5px', margin: '0 1rem' }}>
                  <div style={{ 
                    background: s.base_stat > 70 ? '#48bb78' : s.base_stat > 40 ? '#ecc94b' : '#f56565', 
                    height: '100%', borderRadius: '5px', 
                    width: `${Math.min(s.base_stat, 100)}%` 
                  }} />
                </div>
                <span style={{ fontWeight: 'bold', color: 'var(--text-main)', width: '30px', textAlign: 'right' }}>
                  {s.base_stat}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}