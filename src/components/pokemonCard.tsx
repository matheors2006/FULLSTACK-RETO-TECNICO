import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPokemonDetail } from '../services/api';
import type { PokemonDetail, PokemonResult } from '../types/pokemon';
import styles from './pokemonCard.module.css';
import { useFavorites } from '../hooks/useFavorites';
import Loader from './loader';

interface Props {
  pokemon: PokemonResult;
}

export default function PokemonCard({ pokemon }: Props) {
  const [detail, setDetail] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    // La tarjeta pide sus propios detalles a la API
    getPokemonDetail(pokemon.name)
      .then(data => setDetail(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [pokemon.name]);

  if (loading) return <div className={styles.card}><Loader /></div>;
  if (!detail) return null;

  // Priorizamos la imagen de arte oficial, si no existe usamos el sprite default
  const image = detail.sprites.other?.['official-artwork']?.front_default || detail.sprites.front_default;
  const isFav = isFavorite(pokemon.name);

  return (
    <div className={styles.card} onClick={() => navigate(`/pokemon/${pokemon.name}`)}>
      <button
        className={styles.favButton}
        onClick={(e) => {
          e.stopPropagation(); // Evita que al dar clic al corazón se navegue al detalle
          toggleFavorite(pokemon);
        }}
        title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
      >
        {isFav ? '❤️' : '🤍'}
      </button>
      
      <div className={styles.imageContainer}>
        <img src={image} alt={detail.name} loading="lazy" />
      </div>
      
      <h3 className={styles.name}>{detail.name}</h3>
      
      <div className={styles.types}>
        {detail.types.map(t => (
          <span key={t.type.name} className={styles.typeBadge}>{t.type.name}</span>
        ))}
      </div>
    </div>
  );
}