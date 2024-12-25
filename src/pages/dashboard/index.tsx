import React from "react";
import Layout from "@/pages/layout";
import SalesFigures from "@/app/common-components/com-dashboard/SalesFigures";
import ProductSales from "@/app/common-components/com-dashboard/ProductSales";
import TotalProfit from "@/app/common-components/com-dashboard/TotalProfit";
import TotalSales from "@/app/common-components/com-dashboard/TotalSales";
import Specialties from "@/app/common-components/com-dashboard/SpecialtiesSales";
import UserList from "@/app/common-components/com-dashboard/UserList";
import TotalEarnings from "@/app/common-components/com-dashboard/TotalEarning";
import LastTransactions from "@/app/common-components/com-dashboard/LastTransaction";
import EarningCategories from "@/app/common-components/com-dashboard/EarningCategories";
import TopMenuItems from "@/app/common-components/com-dashboard/TopMenuItems";

const Dashboard: React.FC = () => {
 
  const profitData = [
    { month: 'January', profit: 1000 },
    { month: 'February', profit: 2000 },
  ];
  return (
    <Layout>
      <div className="py-8 px-4 w-full ">
        <div className="ml-4">
          <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
          <div className=" flex justify-center items-center">
            <div className="w-full flex-col lg:flex-row md:flex-col sm:flex-col flex justify-between gap-2">
              <div className="w-full sm:w-2/3">
                {/* left */}
                <SalesFigures className="w-full md:w-auto sales-figures-graph" />
                <div className="w-full gap-3 mt-4 flex flex-col sm:flex-row md:flex-row lg:flex-row">
                  <div className="w-full lg:w-70 sm:w-full">
                    <ProductSales className="w-full md:w-1/2 lg:w-full" />
                  </div>
                  <div className="flex flex-col w-full sm:w-auto" >
                    {/* <div className="w-full">
                      <TotalProfit  
                      data={profitData} 
                      className="w-full md:w-1/2 lg:w-full total-profit-graph" />
                    </div> */}
                    {/* <div className="w-full ">
                      <TotalSales
                      //  data={totalProfitData}  
                       className="w-full  md:w-1/2 lg:w-full total-sales-graph h-96" />
                    </div> */}
                  </div>
                </div>
                {/* <Specialties className="md:w-auto specialties" /> */}
                <UserList className="w-full md:w-auto user-list" />
              </div>

              {/* right */}
              <div className="w-full sm:w-1/3 item-right">
                <TotalEarnings className="w-full md:w-auto total-earnings" />
                <LastTransactions className="w-full md:w-auto last-transactions" />
                <EarningCategories className="w-full md:w-auto earning-categories-graph" />

                {/* <TopMenuItems className="w-full md:w-auto top-menu-items" /> */}
              </div>
            
            </div>
    
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
