import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Página no encontrada</h1>
      <Link to="/">Volver al inicio</Link>
    </main>
  );
}