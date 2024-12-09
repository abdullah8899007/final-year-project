import React from 'react';
import Layout from '../layout';
import PaymentHistory from './PaymentHistory/PaymentHistory';
import InvoicesSent from './InvoicesSent/InvoicesSent';
import WalletBalance from './WalletBalance/WalletBalance';
import WalletProgress from './WalletProgress/WalletProgress';
const Index = () => {
  return (
    <Layout>
     <div className="w-full">
        <h1 className='pt-4 pys-2 font-bold' >Wallet/Payment Gateway</h1>
        <div className="main-balance-container justify-around flex"  >
          <div  className="w-2/3">
            <WalletProgress />
          </div>
          <div className="w-1/4">
            <WalletBalance />   
          </div>
        </div>
        <div className="main-balance-container justify-around flex"  >
          <div >
            <PaymentHistory />
          </div>
          <div >
            <InvoicesSent />
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Index;
