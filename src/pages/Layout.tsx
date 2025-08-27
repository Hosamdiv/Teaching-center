import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout; 