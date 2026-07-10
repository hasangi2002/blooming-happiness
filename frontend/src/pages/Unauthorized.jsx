import { Link } from 'react-router-dom';

const Unauthorized = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-ivory px-6 text-center">
    <p className="eyebrow mb-2 text-blush-600">403</p>
    <h1 className="text-h1 font-display mb-4">Access Denied</h1>
    <p className="text-aubergine-500 mb-8">You don&apos;t have permission to view this page.</p>
    <Link to="/" className="btn-primary">Back Home</Link>
  </div>
);

export default Unauthorized;
