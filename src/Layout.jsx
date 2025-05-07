import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const Layout = ({ children }) => (
  <>
    <Header />
    <main style={{ minHeight: '80vh' }}>{children}</main>
    <Footer />
  </>
);

export default Layout;
