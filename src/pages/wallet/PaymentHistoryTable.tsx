import React from 'react'
import { WALLET_DATA } from './walletData';
import Image from 'next/image';

export default function PaymentHistoryTable() {
    return (
        <div>
            <table>
                <tbody>
                    {WALLET_DATA.map((user, index) => (
                        <tr key={index}>
                            <td className='px-3'>
                                {typeof user.imagePath !== 'string' && (
                                    <Image src={user.imagePath} alt="User Avatar" width={50} height={50} />
                                )}
                            </td>
                            <td className='px-3'>{user.username}</td>
                            <td className='px-3'>{user.date}</td>
                            <td className='px-3'>{user.email}</td>
                            <td className='px-3'>{user.id}</td>
                            <td className='px-3'>
                                <button type="button" className="text-white bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-pink-400 dark:focus:outline-none dark:focus:ring-blue-800">Pending</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
