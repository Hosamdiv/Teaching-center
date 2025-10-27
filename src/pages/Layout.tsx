import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const RootLayout = () => {


  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
