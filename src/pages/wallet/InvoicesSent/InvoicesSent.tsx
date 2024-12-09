import Elispe from "../../../../public/WalletImage/Ellipseimg.png"
import Image from "next/image";
import InvoiceBtn from "../InvoiceBtn";
const InvoicesSent = () => {
  return (
    <div className="p-4 bg-white rounded-lg">
      <h1 className="font-bold">Invoices sent </h1>
      <table className="w-full h-200">
        <tbody>
          <tr>
            <td className="">
              <Image src={Elispe} alt="Logo" className="logo-image-reset cursor-pointer  mt-2 " />
            </td>
            <td className="pr-10 font-semibold text-base"> Steve Store <br />
              <p >4h ago</p> </td>
              <td className="font-semibold text-base text-xs">$268</td>
          </tr>
          <tr>
            <td className="">
              <Image src={Elispe} alt="Logo" className="logo-image-reset cursor-pointer  mt-2 " />
            </td>
            <td className="pr-10 font-semibold text-base"> Steve Store <br />
              <p >4h ago</p> </td>
              <td className="font-semibold text-base text-xs">$268</td>
          </tr>
          <tr>
            <td className="">
              <Image src={Elispe} alt="Logo" className="logo-image-reset cursor-pointer  mt-2 " />
            </td>
            <td className="pr-10 font-semibold text-base"> Steve Store <br />
              <p >4h ago</p> </td>
              <td className="font-semibold text-base text-xs">$268</td>
          </tr>
          <tr>
            <td className="">
              <Image src={Elispe} alt="Logo" className="logo-image-reset cursor-pointer  mt-2 " />
            </td>
            <td className="pr-10 font-semibold text-base"> Steve Store <br />
              <p >4h ago</p> </td>
              <td className="font-semibold text-base text-xs">$268</td>
          </tr>
        
        </tbody>
      </table>
      <div className="invoice-btn-container">
        <InvoiceBtn/>
      </div>
    </div>

  );
}

export default InvoicesSent;
