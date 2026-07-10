import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ivory px-6 text-center">
      <p className="eyebrow mb-2">Blooming Happiness</p>
      <h1 className="text-hero font-display text-gradient-lavender mb-6">Welcome</h1>

      {isAuthenticated ? (
        <>
          <p className="text-aubergine-600 mb-6">
            Signed in as <span className="font-semibold">{user.name}</span> ({user.role})
          </p>
          <button onClick={logout} className="btn-secondary">Log Out</button>
        </>
      ) : (
        <div className="flex gap-4">
          <Link to="/login" className="btn-primary">Sign In</Link>
          <Link to="/register" className="btn-secondary">Create Account</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
