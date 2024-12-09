import axios from 'axios';
import { CategoryItems } from '@/store/slice/categoriesSlice';
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

const BASE_URL = `${API_URLS}/menu/categories/`;

export const fetchCategories = async (): Promise<CategoryItems[]> => {
  try {

    const response = await axios.get<{ data: CategoryItems[] }>(BASE_URL, axiosConfigForimage);
    console.log('Fetch Categories Response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
};
export const createCategory = async (newCategory: Omit<CategoryItems, 'id' | "count">): Promise<CategoryItems> => {
  try {

    const response = await axios.post<{ data: CategoryItems }>(BASE_URL, newCategory, axiosConfigForimage)

    return response.data.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw new Error('Failed to create category');
  }
};
export const updateCategory = async (updatedCategory: Omit<CategoryItems, 'count'>): Promise<CategoryItems> => {
  try {
    if (!updatedCategory.id) {
      throw new Error('Category ID is undefined');
    }
    const response = await axios.put<{ data: CategoryItems }>(`${BASE_URL}${updatedCategory.id}/`, updatedCategory, axiosConfigForimage);
    return response.data.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw new Error('Failed to update category');
  }
};
export const deleteCategory = async (categoryId: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}${categoryId}`);
  } catch (error: any) {
    console.error('Error deleting category:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    throw new Error('Failed to delete category');
  }
};
