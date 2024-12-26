import React, { useState, useEffect } from "react";
import { fetchUserData } from "../../../api/salesreport-api"; // Adjust the path to your API function

interface UserListProps {
  className?: string;
}

const UserList: React.FC<UserListProps> = ({ className }) => {
  const [userData, setUserData] = useState<any[]>([]);
 console.log("userdata",userData)
  const getData = async () => {
    try {
      const response = await fetchUserData();
      console.log("Response from API:", response);

      // Validate the response is an array
      if (response?.results && Array.isArray(response.results)) {
        setUserData(response.results);
      } else {
        console.error("Invalid data format: Expected an array");
        setUserData([]); // Set an empty array to avoid rendering issues
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setUserData([]); // Set an empty array in case of an error
    }
  };

  useEffect(() => {
    getData(); // Fetch data on component mount
  }, []);

  console.log("Processed userData:", userData);

  return (
    <div className={`rounded-lg shadow-lg bg-white user-list p-5 mt-8 ${className}`}>
      <h2 className="text-lg font-semibold mb-3 left-3">User List</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="font-bold text-orange-500 border-b-2 border-[#DDCBBA]">
              <th>Customer</th>
              <th>Contact</th>
              <th>E-Mail</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {/* Check if userData is an array and has data */}
            {Array.isArray(userData) && userData.length > 0 ? (
              userData.map((user) => (
                <tr key={user.id}>
                  <td className="flex items-center py-2 px-1">
                    <div className="ml-2">
                      <h1>{user.name || "N/A"}</h1> {/* Handle missing name */}
                    </div>
                  </td>
                  <td className="py-2 px-4">{user.phone || "N/A"}</td> {/* Handle missing phone */}
                  <td className="py-2 px-4">{user.email || "N/A"}</td> {/* Handle missing email */}
                  <td className="py-2 px-4">{user.address || "N/A"}</td> {/* Handle missing address */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No user data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
