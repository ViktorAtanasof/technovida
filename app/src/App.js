import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import SubCategory from './components/SubCategory/SubCategory';
import Footer from './components/Footer/Footer';
import NotFound from './components/NotFound/NotFound';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Default page is phones so redirect to '/phones/phones' if the current path is '/'
    if (window.location.pathname === '/') {
      navigate('/phones/phones');
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/:category/:subCategory' element={<SubCategory />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
