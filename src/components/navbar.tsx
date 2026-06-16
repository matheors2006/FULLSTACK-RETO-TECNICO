import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <Link to="/">Pokédex Reto</Link>
      </div>
      <ul className={styles.links}>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/favorites">Favoritos</Link>
        </li>
      </ul>
    </nav>
  );
}