import axios from 'axios';
import { Invoice } from '@/store/slice/invoiceSlice';
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

const BASE_URL = `${API_URLS}/orders/invoices/`;


export const fetchInvoice = async (): Promise<Invoice[]> => {
  try {

    const response = await axios.get<{ data: Invoice[] }>(BASE_URL, axiosConfig);
    console.log('Fetch Invoice Info  Response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Invoice Info:', error);
    throw new Error('Failed to fetch Invoice Info ');
  }
};
export const createInvoiceAPI = async (newInvoice: Omit<Invoice, 'invoice_id' | 'issued_at' | 'id'>): Promise<Invoice> => {
  try {

    const response = await axios.post<{ data: Invoice }>(BASE_URL, newInvoice)

    return response.data.data;
  } catch (error) {
    console.error('Error creating Invoice Info:', error);
    throw new Error('Failed to create Invoice Info');
  }
};
export const updateInvoiceAPI = async (updateInvoice: Invoice): Promise<Invoice> => {
  try {
    if (!updateInvoice.invoice_id) {
      throw new Error('Invoice ID is undefined');
    }
    const response = await axios.put<{ data: Invoice }>(`${BASE_URL}${updateInvoice.invoice_id}/`, updateInvoice, axiosConfig);
    return response.data.data;
  } catch (error) {
    console.error('Error updating Invoice:', error);
    throw new Error('Failed to update Invoice');
  }
};

export const deleteInvoiceAPI = async (InvoiceId: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}${InvoiceId}/`,axiosConfig);
  } catch (error: any) {
    console.error('Error deleting Invoice:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    throw new Error('Failed to delete Invoice');
  }
};

