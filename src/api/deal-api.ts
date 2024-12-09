import axios from 'axios';
import { DealItem } from '../store/slice/dealSlice';

export const saveData = async (data: DealItem[]) => {
  try {
    await axios.post('/api/saveData', { data });
    console.log('Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
};


    
