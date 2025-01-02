import React, { useEffect, useState } from "react";
import { fetchAllCategories } from "../../../api/salesreport-api";

const CategoryCard = () => {
  const [mainBalance, setMainBalance] = useState<any[]>([]);

  const getData = async () => {
    try {
      const response = await fetchAllCategories();
      if (response) {
        setMainBalance(response?.results);
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        padding: "16px",
      }}
    >
      {mainBalance?.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            width: "250px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* {item.image && item.image !== "abc" ? (
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          ) : ( */}
            <div
              style={{
                width: "220px",
                height: "150px",
                backgroundColor: "#d15f10",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
            </div>
          {/* )} */}
          <h3 style={{ margin: "8px 0" }}>{item.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default CategoryCard;
