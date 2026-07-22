import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const isHero = pathname === '/';

  return (
    <>
      <Navbar />
      {!isHero && <div className="h-20" />}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
