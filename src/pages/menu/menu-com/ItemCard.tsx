import React, { useEffect, useState } from "react";
import { fetchAllItems } from "../../../api/salesreport-api";

const ItemCard = () => {
  const [mainBalance, setMainBalance] = useState<any[]>([]);

  const getData = async () => {
    try {
      const response = await fetchAllItems();
      if (response) {
        setMainBalance(response);
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
          {/* {item.image ? (
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
                width: "220px", // Ensures a square shape
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
          <p>{item.description}</p>
          <p>
            <strong>Price:</strong> {item.price} PKR
          </p>
          <p>
            <strong>Stock:</strong> {item.stock}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ItemCard;
