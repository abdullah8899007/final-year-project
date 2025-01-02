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
      const items = Array.isArray(prevSelectedItems) ? prevSelectedItems : [];
      return [...items, item];
    });
  };

  const isItemSelected = (item: any) =>
    selectedItem.some((selected) => selected.id === item.id);

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
              boxShadow: isItemSelected(item)
                ? "0 8px 16px rgba(0, 128, 0, 0.3)" // Highlight selected items
                : "0 4px 6px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              backgroundColor: isItemSelected(item) ? "#f0fff4" : "white", // Light green for selected items
              transition: "all 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = isItemSelected(item)
                ? "0 8px 16px rgba(0, 128, 0, 0.3)"
                : "0 4px 6px rgba(0, 0, 0, 0.1)";
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
