import axios from 'axios';
import { Customer, LoginCustomer } from '@/store/slice/customerSlice';
import { API_URLS } from '@/utils/api-urls';  
const axiosConfig = {
  headers: {
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  }
};
const axiosConfigForimage = {
  headers: {
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true',
    'Content-Type': 'multipart/form-data',
  }
};


const BASE_URL = `${API_URLS}/customers/customer`;



export const loginCustomer = async (Customer: Omit<LoginCustomer, 'id'>): Promise<LoginCustomer> => {
  try {

    const response = await axios.post<{ data: LoginCustomer }>(`${API_URLS}/accounts/login/`,Customer , axiosConfig);
    console.log('Fetch customer Info  Response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching customer Info:', error);
    throw new Error('Failed to fetch customer Info ');
  }
};

export const fetchCustomer = async (): Promise<Customer[]> => {
  try {

    const response = await axios.get<{ data: Customer[] }>(BASE_URL, axiosConfigForimage);
    console.log('Fetch customer Info  Response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching customer Info:', error);
    throw new Error('Failed to fetch customer Info ');
  }
};
export const createCustomerAPI = async (newCustomer: Omit<Customer, 'id'>): Promise<Customer> => {
  try {

    const response = await axios.post<{ data: Customer }>(BASE_URL, newCustomer, axiosConfigForimage)

    return response.data.data;
  } catch (error) {
    console.error('Error creating customer Info:', error);
    throw new Error('Failed to create customer Info');
  }
};
export const updateCustomerAPI = async (updateCustomer: Customer): Promise<Customer> => {
  try {
    if (!updateCustomer.id) {
      throw new Error('customer ID is undefined');
    }
    const response = await axios.put<{ data: Customer }>(`${BASE_URL}${updateCustomer.id}/`, updateCustomer, axiosConfigForimage);
    return response.data.data;
  } catch (error) {
    console.error('Error updating customer:', error);
    throw new Error('Failed to update customer');
  }
};

export const deleteCustomerAPI = async (CustomerId: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL} /${CustomerId}/`,axiosConfig);
  } catch (error: any) {
    console.error('Error delete customer:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    throw new Error('Failed to delete customer');
  }
};

export const SignUpApi = async (Customer: Omit<LoginCustomer, 'id'>): Promise<LoginCustomer> => {
  try {
    const response = await axios.post<{ data: LoginCustomer }>(
      `${API_URLS}/accounts/register/`, 
      Customer, 
      axiosConfig
    );
    console.log('SignUp customer Info Response:', response.data);
    return response.data.data;
  } catch (error: any) {
    console.error('Error signing up customer:', error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || 'Failed to sign up customer');
  }
};
