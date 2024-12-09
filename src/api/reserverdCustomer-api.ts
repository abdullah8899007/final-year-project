// api/reservedCustomer-api.ts
import axios from 'axios';
import { Customer } from '../pages/reservation/types';

const API_BASE_URL = 'http://localhost:3000';

export const fetchCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await axios.get<Customer[]>(`${API_BASE_URL}/customers`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching customers: ${error}`);
  }
};

export const addCustomer = async (customer: Customer): Promise<Customer> => {
  try {
    const response = await axios.post<Customer>(`${API_BASE_URL}/customers`, customer, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error adding customer: ${error}`);
  }
};
