import React, { useState, useEffect } from "react";
import { fetchUserData } from "../../../api/salesreport-api";
import Image from "next/image";

interface UserListProps {
  className?: string;
}

const UserList: React.FC<UserListProps> = ({ className }) => {
  const [userData, setUserData] = useState<any[]>([]);

  const getData = async () => {
    try {
      const response = await fetchUserData();
      console.log("response",response[0])
      if (response) {
        setUserData(response); // Set the fetched data
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData(); // Fetch data on component mount
  }, []);

  console.log("userData",userData)
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
            {/* Map over userData array instead of usersData */}
            {userData.map((user) => (
              <tr key={user.id}>
                <td className="flex items-center py-2 px-1">
                  <div className="ml-2">
                    <h1>{user.name}</h1>
                  </div>
                </td>
                <td className="py-2 px-4">{user.phone}</td> {/* Use phone from the backend response */}
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
