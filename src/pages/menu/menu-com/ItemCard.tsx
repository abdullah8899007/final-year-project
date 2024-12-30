import React, { useEffect } from "react";
import { fetchAllItems } from "../../../api/salesreport-api";

const SelectedItem = ({ item }: { item: any }) => {
  return (
    <div
      style={{
        marginTop: "16px",
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        width: "300px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3>Selected Item</h3>
      <h4>{item?.name || "No item selected"}</h4>
      <p>{item?.description}</p>
      <p>
        <strong>Price:</strong> {item?.price} PKR
      </p>
      <p>
        <strong>Stock:</strong> {item?.stock}
      </p>
    </div>
  );
};

const ItemCard = ({
  data,
  setData,
  selectedItem,
  setSelectedItem,
}: {
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  selectedItem: any[];
  setSelectedItem: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchAllItems();
        if (response) {
          setData(response);
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [setData]);

  const handleSelectItem = (item: any) => {
    setSelectedItem((prevSelectedItems) => {
      // Ensure prevSelectedItems is an array before spreading
      const items = Array.isArray(prevSelectedItems) ? prevSelectedItems : [];
      return [...items, item];
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          padding: "16px",
        }}
      >
        {data?.map((item) => (
          <div
            key={item.id}
            onClick={() => handleSelectItem(item)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              width: "250px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
            }}
          >
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
            ></div>
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
    </div>
  );
};

export default ItemCard;
