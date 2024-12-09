import React, { useEffect, useState } from 'react';
import Layout from '@/pages/layout';
import InvoiceTable from '@/pages/Invoice/invoiceTable';



interface InvoiceTableProps {
  orderId: number;
}

const Invoice : React.FC<InvoiceTableProps> = ({ orderId }) => {
  return (
    <Layout>
<InvoiceTable/>
   
    </Layout>
  );
}

export default Invoice;
