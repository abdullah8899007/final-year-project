import React, { useEffect, useState } from "react";
import { fetchAllCategories } from "../../../api/salesreport-api";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const CategoryCard = () => {
  const [categories, setCategories] = useState<any[]>([]);

  const getData = async () => {
    try {
      const response = await fetchAllCategories();
      if (response) {
        setCategories(response?.results);
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8001/menu/categories/${id}/`, {
        headers: {
          Authorization: "token 040b2736f98b8ab7c5a4e00e6b6ff3e3ea1e2239",
        },
      });
      alert("Category deleted successfully!");
      getData(); // Refresh the list
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete the category. Please try again.");
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
      {categories?.map((item) => (
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
            {/* Placeholder for image */}
          </div>
          <h3 style={{ margin: "8px 0" }}>{item.name}</h3>
          {/* <button
            onClick={() => handleDelete(item.id)}
            style={{
              marginTop: "10px",
              backgroundColor: "#d9534f",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Delete
          </button> */}
            <FontAwesomeIcon
                        icon={faTrash}
                        style={{
                          marginTop: "10px",
                          color: "#ff4d4f",
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDelete(item.id)}
                      />
        </div>
      ))}
    </div>
  );
};

export default CategoryCard;
