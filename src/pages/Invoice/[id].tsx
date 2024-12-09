import React from "react";
import { useRouter } from "next/router";
import InvoiceDetails from "./InvoiceDetails";
import { ORDER_DATA } from "@/api/data";

const Id = () => {
  const router = useRouter();
  const { invoice_id } = router.query;

  const invoiceData = {
    invoice_id: invoice_id,
    customerName: "",
    customerAddress: "",
    customerPhone: " ",
    items: [
      { invoice_id: 0, name: " ", quantity: 0 },
      { invoice_id: 0, name: " ", quantity: 0 },
    ],
    totalQuantity: 0,
  };

  const handleCloseInvoiceDetail = () => {};

  return (
    <div>
      <InvoiceDetails
        invoice={invoiceData}
        onClose={handleCloseInvoiceDetail}
        orders={ORDER_DATA}
      />
    </div>
  );
};

export default Id;
