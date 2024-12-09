import React, { useState } from "react";
import Layout from "../layout";
import { PageContainer } from "./helpers/PageContainer";
import { PageHeader } from "./helpers/PageHeader";
import ReportTable from "./helpers/ReportTable";

const Report = () => {
  const [state, setState] = useState<string>("monthly");
  const btn = (
    <select
      className="h-[52px] !rounded-full  p-[10px] bg-[#EA6A12] text-[#FFFFFF] "
      name="select"
      onChange={(e: string | any) => setState(e.target.value)}
    >
      <option value="monthly">Monthly</option>
      <option value="weekly">Weekly</option>
    </select>
  );
  return (
    <Layout>
      <div>
        <PageContainer>
          <div>
            <PageHeader title="Sale Report" extra={btn} />
            <ReportTable state={state} />
          </div>
        </PageContainer>
      </div>
    </Layout>
  );
};

export default Report;
