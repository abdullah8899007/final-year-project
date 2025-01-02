import axios from 'axios';
import { API_URLS } from '@/utils/api-urls';  
import { Reservation } from '@/store/Re-Slice/ReservationSlice';
const axiosConfig = {
  headers: {
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  }
};
export const createReservationApi = async (newReservation: Omit<Reservation, 'id'>) :Promise <Reservation>=> {
  try {
    const response = await axios.post (API_URLS +'/tables/reservations/', newReservation,axiosConfig);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create reservation');
  }
};

export const deleteReservationApi = async (reservationId: string) => {
  try {
    const response = await axios.delete(API_URLS +`/tables/reservations/${reservationId}`,axiosConfig);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete reservation');
  }
};

export const fetchReservationsApi = async () => {
  try {
    const response = await axios.get(API_URLS +'/tables/reservations/',axiosConfig);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch reservations');
  }
};

export const fetchSalesApi  = async () => {
  try {
    const response = await axios.get(API_URLS +'/sales/main-balance/',axiosConfig);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch reservations');
  }
};

export const fetchCategoryApi  = async () => {
  try {
    const response = await axios.get(API_URLS +'/orders/analytics/categories-sales/',axiosConfig);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch reservations');
  }
};

export const SendCustomerData = async (newReservation: Omit<Reservation, 'id'>) :Promise <Reservation>=> {
  try {
    const response = await axios.post (API_URLS +'/customers/create_customer/', newReservation,axiosConfig);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create reservation');
  }
};

export const fetchCustomerId  = async () => {
  try {
    const response = await axios.get(API_URLS +'/customers/create_customer/latest/',axiosConfig);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch reservations');
  }
};
