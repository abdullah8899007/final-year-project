import React from 'react';
import PaymentHistoryTable from '../PaymentHistoryTable';

const PaymentHistory = () => {
  return (
    <>
      <div className="payment-history-container mt-7" >
      <div className="payment-layer flex justify-between w-full">
          <h1 className='pl-5 font-bold'>Payment History</h1>
        </div>
        <div className="payment-history-layer pl-5 py-2" >
          <PaymentHistoryTable/>
        </div>
      </div >
    </>
  );
}

export default PaymentHistory;
