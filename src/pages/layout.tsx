import React from 'react';
import Header from '../app/common-components/header';
import Sidebar from '../app/common-components/sidebar';
import './layout.css';
import Script from 'next/script';
// import Footer from '@/app/common-components/footer';

import { ReduxProvider } from "../store/ReduxProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <ReduxProvider>
    <div> 
      <Header/>
      
      <div className="flex flex-col md:flex-row bg-[#fbf9f0]   ">
      
        <div className="bg-[#fbf9f0] w-[13%] flex-none md:mr-2   ">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-[#fbf9f0] mb-5  ">
          <section className="w-full">
            {children} 
            </section>
          <Script />
        </div>
      </div>
      {/* <Footer/> */}
    </div>
    </ReduxProvider>
  
  );
}; 
