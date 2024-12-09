import { SalesData } from './../../api/saleData';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/root-store';
import { saveData } from '@/api/deal-api';
export interface SalesData {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  categoryName?: string;
}
interface DealState {
  items: SalesData[];
  selectedItem: SalesData | null;
  isLoading: boolean;
  error: string | null;
  filter: string | null;
}
const initialState: SalesState = {
  items: [],
  selectedItem: null,
  isLoading: false,
  error: null,
  filter: null,
};
export const fetchDealItemsAsync = createAsyncThunk<SalesData[]>(
  'deal/fetchDealItems',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const response = await saveData(state.deal.items);
      return response;
    } catch (error) {
      console.error('Error fetching deal items:', error);
      throw error;
    }
  }
);
export const selectSalesDataById = (state: RootState, id: number): SalesData | null => {
  const DealItem = state.deal.items.find(item => item.id === id);
  return SalesData ? SalesData : null;
};
const dealSlice = createSlice({
  name: 'deal',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string | null>) => {
      state.filter = action.payload;
    },
    addDealItem: (state, action: PayloadAction<SalesData>) => {
      state.items.push(action.payload);
    },

    updateDealItem: (state, action: PayloadAction<SalesData>) => {
      const updatedItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (updatedItemIndex !== -1) {
        state.items = state.items.map((item, index) =>
          index === updatedItemIndex ? action.payload : item
        );
      }
    },
    deleteDealItem: (state, action: PayloadAction<Number>) => {

      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setItems: (state, action: PayloadAction<DealItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDealItemsAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDealItemsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchDealItemsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Error fetching deal items';
      });
  },
});
export const { setFilter, addDealItem, updateDealItem, deleteDealItem, setLoading, setError, setItems } = dealSlice.actions;
export const selectItems = (state: RootState) => state.deal.items;
export default dealSlice.reducer;
