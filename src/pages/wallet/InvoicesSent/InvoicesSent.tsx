import React, { useEffect, useState } from "react";
import axios from "axios";
import Elispe from "../../../../public/WalletImage/Ellipseimg.png";
import Image from "next/image";
import InvoiceBtn from "../InvoiceBtn";

const InvoicesSent = () => {
  const [invoices, setInvoices] = useState<any[]>([]);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get("http://localhost:8001/sales/invoices/", {
        headers: {
          Cookie: "csrftoken=GxPstv9AT2byXxjd5NCtzrsqzpwih8uTy9BZOsxsvb3AOz70tinyxymJgRihM5c6; sessionid=inoe6mkrngmsw7ss1vssydm778fwaw9k",
        },
      });

      if (response.data?.data?.data) {
        setInvoices(response.data.data.data); // Access nested data
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg">
      <h1 className="font-bold">Invoices Sent</h1>
      <table className="w-full">
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.invoice_id}>
              <td>
                <Image
                  src={Elispe}
                  alt="Logo"
                  className="logo-image-reset cursor-pointer mt-2"
                />
              </td>
              <td className="pr-10 font-semibold text-base">
                {invoice.customer_name} <br />
                <p>{new Date(invoice.issued_at).toLocaleString()}</p>
              </td>
              <td className="font-semibold text-base text-xs">${invoice.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="invoice-btn-container">
        <InvoiceBtn />
      </div>
    </div>
  );
};

export default InvoicesSent;
