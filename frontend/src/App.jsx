import { useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import Layout from './components/layout/Layout';
import PageLoader from './components/common/PageLoader';

function App() {
  const [showLoader, setShowLoader] = useState(
    () => !sessionStorage.getItem('bh_has_loaded')
  );

  useEffect(() => {
    if (!showLoader) {
      sessionStorage.setItem('bh_has_loaded', 'true');
    }
  }, [showLoader]);

  return (
    <>
      {showLoader && <PageLoader onFinish={() => setShowLoader(false)} />}
      {!showLoader && (
        <Layout>
          <AppRoutes />
        </Layout>
      )}
    </>
  );
}

export default App;
