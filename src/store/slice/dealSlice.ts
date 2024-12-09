import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/root-store';
import { saveData } from '@/api/deal-api';
export interface DealItem {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  categoryName?: string;
}
interface DealState {
  items: DealItem[];
  selectedItem: DealItem | null;
  isLoading: boolean;
  error: string | null;
  filter: string | null;
}
const initialState: DealState = {
  items: [],
  selectedItem: null,
  isLoading: false,
  error: null,
  filter: null,
};
export const fetchDealItemsAsync = createAsyncThunk<DealItem[]>(
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
export const selectDealItemById = (state: RootState, id: number): DealItem | null => {
  const DealItem = state.deal.items.find(item => item.id === id);
  return DealItem ? DealItem : null;
};
const dealSlice = createSlice({
  name: 'deal',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string | null>) => {
      state.filter = action.payload;
    },
    addDealItem: (state, action: PayloadAction<DealItem>) => {
      state.items.push(action.payload);
    },

    updateDealItem: (state, action: PayloadAction<DealItem>) => {
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