import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import PokemonDetail from './pages/pokemonDetail';
import Favorites from './pages/favorites';
import NotFound from './pages/notFound';

function App() {
  return (
    <>
      <Navbar />
      {/* El contenido dinámico cambiará aquí dependiendo de la URL */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;