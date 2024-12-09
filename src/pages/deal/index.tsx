import React from "react";
import Layout from "../layout";
import DealsCards from "./DealsCard";
import ItemCard from "./ItemCard";
const Deals = () => {
  return (
    <Layout>
      <DealsCards />
      <ItemCard />
    </Layout>
  );
};

export default Deals;
