import { useAuth } from '../../context/AuthContext';

const AdminStub = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ivory px-6 text-center">
      <p className="eyebrow mb-2">Admin Area</p>
      <h1 className="text-h1 font-display mb-4">Hello, {user.name}</h1>
      <p className="text-aubergine-500">Full admin dashboard coming in a later phase.</p>
    </div>
  );
};

export default AdminStub;
