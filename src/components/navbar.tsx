import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { currentThemeKey, changeTheme, availableThemes } = useTheme();

  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <Link to="/">Pokédex Reto</Link>
      </div>
      <ul className={styles.links}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/favorites">Favoritos</Link></li>
        
        {/* Desplegable de Temas (Hover) */}
        <li className={styles.dropdown}>
          <span className={styles.dropbtn}>Temas ▼</span>
          <div className={styles.dropdownContent}>
            {availableThemes.map(theme => (
              <button 
                key={theme.key} 
                className={`${styles.themeOption} ${currentThemeKey === theme.key ? styles.activeTheme : ''}`}
                onClick={() => changeTheme(theme.key)}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </li>
      </ul>
    </nav>
  );
}