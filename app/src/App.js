import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import SubCategory from './components/SubCategory/SubCategory';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Default page is phones so redirect to /phones/phones if the current path is '/'
    if (window.location.pathname === '/') {
      navigate('/phones/phones');
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/:category/:subCategory' element={<SubCategory />} />
      </Routes>
    </>
  );
}

export default App;
