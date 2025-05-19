import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbit from './pages/Chatbit';

const Layout = ({ children }) => (
  <>
    <Header />
    <main style={{ minHeight: '80vh' }}>{children}</main>
    <Chatbit />
    <Footer />
  </>
);

export default Layout;
