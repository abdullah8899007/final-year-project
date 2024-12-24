import axios from 'axios';
import {  Order } from '../store/slice/orderSlice';
import { API_URLS } from '@/utils/api-urls'
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

const BASE_URL = `${API_URLS}/orders/orders/`;

export const fetchOrder = async (): Promise<Order[]> => {
  try {

    const response = await axios.get<{ data: Order[] }>(BASE_URL, axiosConfigForimage);
    console.log('Fetch Order Info  Response:', response.data);
    console.log("axios order",response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Order Info:', error);
    throw new Error('Failed to fetch Order Info ');
  }
};
export const createOrderAPI = async (data: Omit<Order, 'id' | 'created_at'>): Promise<Order> => {
  try {
    const response = await axios.post<Order>(BASE_URL, data);
    console.log("New Order:", data);
    return response.data;
  } catch (error) { 
    console.error('Error creating Order Info:', error);
    throw new Error('Failed to create Order Info');
  }
};
export const updateOrderAPI = async (updateOrder: Order): Promise<Order> => {
  try {
    if (!updateOrder.id) {
      throw new Error('Order ID is undefined');
    }
    const response = await axios.put<{ data: Order }>(`${BASE_URL}${updateOrder.id}/`, updateOrder, );
    return response.data.data;
  } catch (error) {
    console.error('Error updating Order:', error);
    throw new Error('Failed to update Order');
  }
};

export const deleteOrderAPI = async (orderId: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}${orderId}/`,axiosConfig);
  } catch (error: any) {
    console.error('Error deleting Order:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);

      console.error('Response headers:', error.response.headers);
    }
    throw new Error('Failed to delete Order');
  }
};
