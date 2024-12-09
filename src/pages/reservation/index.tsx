import React from 'react';

import Layout from '../layout';
import ReservationManagement from './reservation-com/ReservationManagement';
const Reservation: React.FC = () => {
  return (
    <Layout>
    <div>
      <ReservationManagement/>
      
    </div>
    </Layout>
  );
};

export default Reservation;
