import Link from 'next/link';
import React from 'react';
import './style.css';
import Image from 'next/image';
import MenuIcon from '../../../public/images/menu.svg';
import DashboardIcon from '../../../public/images/dashbaorIcon.svg';
import menuCate from '../../../public/images/carbon_categories.svg';
import dealIcon from'../../../public/images/arcticons_hotukdeals.svg';
import orderIcon from '../../../public/images/material-symbols_orders-rounded.svg';
import invoiceIcon from '../../../public/images/basil_invoice-solid.svg';
import walletIcon from '../../../public/images/wallet.svg';
import infoIcon from '../../../public/images/material-symbols_info.svg';
import reportIcon from '../../../public/images/icon-park-solid_sales-report.svg';
import resevIcon from '../../../public/images/fluent-mdl2_reservation-orders.svg';
import { MdOutlineSegment } from "react-icons/md";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeItem, setActiveItem] =React.useState('');
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleItemClick = (itemName: string) => {
   setActiveItem(itemName);
 };
  return ( 
  <>
<button
        onClick={toggleSidebar}
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2
         focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <MdOutlineSegment className='text-3xl' />
      </button>

      <aside
        id="default-sidebar"
        className={`absolute left-0 z-40 w-25  transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        {/* Sidebar content */}
   <div className=" px-3 py-5 overflow-y-auto bg-[#ffffff]   w-full ">
      <ul className="space-y-2 font-medium">
     
         <li className={activeItem === 'dashboard' ? 'bg-[#f7c3a0] rounded-lg' : ''}>
      
            <Link href="/dashboard" className="flex items-center p-2 
             text-[#8c5936] rounded-lg dark:text-white hover:bg-[#f7c3a0] group"
             onClick={() => handleItemClick('dashboard')}>
              <Image src={DashboardIcon} alt='menu'/>
               <span className="ms-3 text-[#8c5936]">Dashboard</span>
            </Link>
          
         </li>
      
         <li className={activeItem === 'menu' ? 'bg-[#f7c3a0] rounded-lg' : ''} >
            <Link href="../menu" className="flex items-center p-2 
             text-[#8c5936] rounded-lg dark:text-white hover:bg-[#f7c3a0] group"
             onClick={() => handleItemClick('menu')}>
              <Image src={MenuIcon} alt='menu'/>
               <span className="ms-3   hover:text-[#8c5936] text-[#777777]">Menu</span>
            </Link>
         </li>
         <li className={activeItem === 'menuCategories' ? 'bg-[#f7c3a0] rounded-lg' : ''}  >
            <Link href="../menuCategories" className="flex items-center p-2 
            hover:text-[#8c5936] text-black rounded-lg dark:text-white hover:bg-[#f7c3a0] group"
            onClick={() => handleItemClick('menuCategories')}>
              <Image src={menuCate} alt='menuCate'/>
               <span className="ms-3 hover:text-[#8c5936] text-[#777777]  ">Categories</span>
            </Link>
         </li>
         <li className={activeItem === 'deals' ? 'bg-[#f7c3a0] rounded-lg' : ''} >
            <Link href="../deals" className="flex items-center p-2 
            hover:text-[#8c5936] text-black  rounded-lg dark:text-white hover:bg-[#f7c3a0] group"
            onClick={() => handleItemClick('deals')}>
             <Image src={dealIcon} alt='deals'/>
               <span className="ms-3 hover:text-[#8c5936] text-[#777777]  ">Deals</span>
            </Link>
         </li>
         <li className={activeItem === 'order' ? 'bg-[#f7c3a0] rounded-lg' : ''} >
            <Link href="../order" className="flex items-center p-2 
           hover:text-[#8c5936] text-black  rounded-lg dark:text-white hover:bg-[#f7c3a0] group"
           onClick={() => handleItemClick('order')}>
               <Image src={orderIcon} alt='order'/>
               <span className="ms-3 hover:text-[#8c5936] text-[#777777]">Orders</span>
            </Link>
         </li>

          <li className={activeItem === 'invoice' ? 'bg-[#f7c3a0] rounded-lg' : ''}>
            <Link href="../Invoice" className="flex items-center p-2 
            hover:text-[#8c5936] text-black  rounded-lg dark:text-white hover:bg-[#f7c3a0] group"
            onClick={() => handleItemClick('invoice')}>
              <Image src={invoiceIcon} alt='invoice '/>
               <span className="ms-3 hover:text-[#8c5936] text-[#777777]">Invoice</span>
            </Link>
         </li>
         <li className={activeItem === 'wallet' ? 'bg-[#f7c3a0] rounded-lg' : ''} >
            <Link href="../wallet" className="flex items-center p-2 
            hover:text-[#8c5936] text-black  rounded-lg dark:text-white hover:bg-[#f7c3a0] group"
            onClick={() => handleItemClick('wallet')} >
               <Image src={walletIcon} alt='wallet'/>
               <span className="ms-3 hover:text-[#8c5936] text-[#777777]">Wallet</span>
            </Link>
         </li>
         <li className={activeItem === 'customer' ? 'bg-[#f7c3a0] rounded-lg' : ''} >
            <Link href="../customer" className="flex items-center p-2 
             hover:text-[#8c5936] text-black  rounded-lg dark:text-white hover:bg-[#f7c3a0] group"
             onClick={() => handleItemClick('customer')}>
               <Image src={infoIcon} alt='info'/>
               <span className="ms-3 hover:text-[#8c5936] text-[#777777]">Customer Info</span>
            </Link>
         </li>
         <li className={activeItem === 'report' ? 'bg-[#f7c3a0] rounded-lg' : ''}>
            <Link href="../reports" className="flex items-center p-2 
             hover:text-[#8c5936] text-black  rounded-lg dark:text-white hover:bg-[#f7c3a0] group"
             onClick={() => handleItemClick('report')}>
             <Image src={reportIcon} alt='Report'/>
               <span className="ms-3 hover:text-[#8c5936] text-[#777777]">Sale Report</span>
            </Link>
         </li>
         <li className={activeItem === 'reservation' ? 'bg-[#f7c3a0] rounded-lg' : ''}>
            <Link href="../reservation" className="flex items-center p-2 
            hover:text-[#8c5936] text-black rounded-lg dark:text-white hover:bg-[#f7c3a0] group"
            onClick={() => handleItemClick('reservation')}>
               <Image src={resevIcon} alt='reservation'/>
               <span className="ms-3 hover:text-[#8c5936] text-[#777777] ">Reservation</span>
            </Link>
         </li>
      </ul>
   </div>
</aside>

</>

  );
};

export default Sidebar;
