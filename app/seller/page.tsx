
import React from 'react';


import { AppProps } from 'next/app';
import NavBar from './components/navbar';
import TopBar from './components/topbar';
import 'tailwindcss/tailwind.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <TopBar />
      <NavBar />
      <div className="container mx-auto mt-8">
        <Component {...pageProps} />
      </div>
    </div>
  );
};

export default MyApp;


