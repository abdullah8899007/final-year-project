import axios from 'axios';
import { SalesReportItem } from '@/store/slice/salesReport';
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

const BASE_URL = `${API_URLS}`;

export const fetchYearlyItems = async (): Promise<SalesReportItem[]> => {
  try {
    const response = await axios.get<{ data: SalesReportItem[] }>(`${API_URLS}/yearly-totals`);
    console.log('Fetch Sales Items  Response: sss', response);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Menu Items:', error);
    throw new Error('Failed to fetch sales Items ');
  }
};
export const fetchMonthlyItems = async (): Promise<SalesReportItem[]> => {
  try {
    const response = await axios.get<{ data: SalesReportItem[] }>(`${API_URLS}/monthly-totals`);
    console.log('Fetch Sales Items  Response: sss', response);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Menu Items:', error);
    throw new Error('Failed to fetch sales Items ');
  }
};
type MonthlySalesResponse = {
  data: number[];
};
export const fetchMonthlySales = async (): Promise<number[]> => {
  try {
    const response = await axios.get<MonthlySalesResponse>(
      `${API_URLS}/sales/monthly-sales/`,
      {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );
    return response.data.data; 
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching monthly sales:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw new Error('Failed to fetch monthly sales');
  }
};
export const fetchWeeklySales = async (): Promise<number[]> => {
  try {
    const response = await axios.get<MonthlySalesResponse>(
      `${API_URLS}/sales/weekly-sales/`,
      {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );
    return response.data.data; 
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching monthly sales:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw new Error('Failed to fetch monthly sales');
  }
};
interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  data: number[];

}

export const fetchUserData = async (): Promise<number[]> => {
  try {
    const response = await axios.get<Customer>(
      `${API_URLS}/customers/customer/`,
      {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );
    return response.data.data; 
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching monthly sales:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw new Error('Failed to fetch monthly sales');
  }
};

export const fetchLastTransactions = async (): Promise<any[]> => {
  try {
    const response = await axios.get<Customer>(
      `${API_URLS}/orders/latest_orderdetail/`,
      {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );
    return response.data.data; 
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching monthly sales:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw new Error('Failed to fetch monthly sales');
  }
};

export const fetchInvoiceData = async (): Promise<any[]> => {
  try {
    const response = await axios.get<Customer>(
      `${API_URLS}/sales/invoices/`,
      {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );
    return response.data.data; 
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching monthly sales:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw new Error('Failed to fetch monthly sales');
  }
};

export const fetchAllItems = async (): Promise<any[]> => {
  try {
    const response = await axios.get<Customer>(
      `${API_URLS}/menu/items/all_items/`,
      {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );
    return response.data.data; 
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching monthly sales:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw new Error('Failed to fetch monthly sales');
  }
};

export const fetchAllCategories = async (): Promise<any[]> => {
  try {
    const response = await axios.get<Customer>(
      `${API_URLS}/menu/all_categories/`,
      {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );
    return response.data.data; 
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching monthly sales:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw new Error('Failed to fetch monthly sales');
  }
};

