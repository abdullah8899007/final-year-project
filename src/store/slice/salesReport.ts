import { createAsyncThunk, createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/root-store';
import { 
  fetchYearlyItems,
  fetchMonthlyItems } from '@/api/salesreport-api';

export interface SalesReportItem {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  image: string;
  stock: number; 
}

interface SalesReportState {
  items: SalesReportItem[];
  selectedItem: SalesReportItem | null;
  isLoading: boolean;
  error: string | null;
  filter: string | null;
}

const initialState: SalesReportState = {
  items: [],
  selectedItem: null,
  isLoading: false,
  error: null,
  filter: null,
};
export const fetchSalesReportItemsAsync = createAsyncThunk(
  'sales/fetchSalesReportItems',
  async (_,thunkAPI ) => {
    try { 
      thunkAPI.dispatch(setLoading(true));
      const sales= await fetchYearlyItems();
      return sales;
    } catch (error) {
      throw error;
    } finally {
      thunkAPI.dispatch(setLoading(false));
    } 
  }
);
export const fetchMonthlyAsync = createAsyncThunk(
  'sales/fetchWeeklyAsync',
  async (_,thunkAPI ) => {
    try { 
      thunkAPI.dispatch(setLoading(true));
      const sales= await fetchMonthlyItems();
      return sales;
    } catch (error) {
      throw error;
    } finally {
      thunkAPI.dispatch(setLoading(false));
    } 
  }
);


const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string | null>) => {
      state.filter = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setItems: (state, action: PayloadAction<SalesReportItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSalesReportItemsAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSalesReportItemsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchSalesReportItemsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Error fetching sales items';
      })

      .addCase(fetchMonthlyAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMonthlyAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchMonthlyAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Error fetching sales items';
      })
  },
});

export const { setFilter, setLoading, setError, setItems } = salesSlice.actions;
export const selectAllitems = (state: RootState) => state.sales.items;
export default salesSlice.reducer;

export const selectSalesReportItemById = (id: number) =>
  createSelector(
    selectAllitems,
    salesReportItem => salesReportItem.find(item => item.id === id) || null
  );
 