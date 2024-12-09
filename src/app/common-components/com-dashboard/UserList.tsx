import React from "react";
import { usersData } from "@/data/userData";
import Image from "next/image";

interface UserListProps {
  className?: string;
}

const UserList: React.FC<UserListProps> = ({ className }) => {
  return (
    <div
      className={`rounded-lg shadow-lg bg-white user-list  p-5 mt-8 ${className}`}
    >
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
            {usersData.map((user) => (
              <tr key={user.id}>
                <td className="flex items-center py-2 px-1">
                  <div className="w-10 h-10">
                    <Image
                      src={user.image}
                      alt={user.name}
                      className="rounded-full object-cover"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="ml-2">
                    <h1>{user.name}</h1>
                  </div>
                </td>
                <td className="py-2 px-4">{user.address}</td>
                <td className="py-2 px-4">{user.contact}</td>
                <td className="py-2 px-4">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
