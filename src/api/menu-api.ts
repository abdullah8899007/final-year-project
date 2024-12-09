import axios from 'axios';
import { MenuItem } from '@/store/slice/menuSlice';
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

const BASE_URL = `${API_URLS}/menu/items/`;

export const fetchItems = async (): Promise<MenuItem[]> => {
  try {

    const response = await axios.get<{ data: MenuItem[] }>(BASE_URL, axiosConfigForimage);
    console.log('Fetch Menu Items  Response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Menu Items:', error);
    throw new Error('Failed to fetch Menu Items ');
  }
};
export const createItems = async (newItems: Omit<MenuItem, 'id'>): Promise<MenuItem> => {
  try {

    const response = await axios.post<{ data: MenuItem }>(BASE_URL, newItems, axiosConfigForimage)

    return response.data.data;
  } catch (error) {
    console.error('Error creating MenuItems:', error);
    throw new Error('Failed to create MenuItems');
  }
};
export const updateItems = async (updateMenuItem: MenuItem): Promise<MenuItem> => {
  try {
    if (!updateMenuItem.id) {
      throw new Error('Category ID is undefined');
    }
    const response = await axios.put<{ data: MenuItem }>(`${BASE_URL}${updateMenuItem.id}/`, updateMenuItem, axiosConfigForimage);
    return response.data.data;
  } catch (error) {
    console.error('Error updating MenuItems:', error);
    throw new Error('Failed to update MenuItems');
  }
};

export const deleteItems = async (itemId: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}${itemId}`);
  } catch (error: any) {
    console.error('Error deleting MenuItems:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    throw new Error('Failed to delete category');
  }
}; 
