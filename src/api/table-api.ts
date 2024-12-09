
import axios from 'axios';
import { API_URLS } from '../utils/api-urls';
import {Table} from '@/pages/reservation/types'
const axiosConfig = {
  headers: {
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  }
};
export const createTableApi = async (tableData: Omit<Table, 'id'>): Promise<Table> => {
  try {
    const response = await axios.post(API_URLS + '/tables/tables/', tableData,axiosConfig);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create table');
  }
};

export const deleteTableApi = async (tableId: string) => {
  try {
    const response = await axios.delete(`${API_URLS}/tables/tables/${tableId}`,axiosConfig);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete table');
  }
};

export const fetchTablesApi = async () => {
  try {
    const response = await axios.get(API_URLS + '/tables/tables/',axiosConfig);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch tables');
  }
};
