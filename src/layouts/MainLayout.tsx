import { Outlet } from 'react-router-dom';
import Header from '../components/Header-Home/Header';
import Footer from '../components/Footer/Footer';
import Banner from '../components/Banner/Banner';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Banner />

      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
