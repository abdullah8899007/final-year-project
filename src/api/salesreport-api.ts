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