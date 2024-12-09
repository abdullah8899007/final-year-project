import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/root-store';
import {createCustomerAPI,fetchCustomer,updateCustomerAPI,deleteCustomerAPI} from '@/api/customer-api';
import { deleteOrderAsync } from './orderSlice';
export interface Customer {
  id: number;
  name: string;
  phone: string;
  address: string;
  email: string;
}

export interface LoginCustomer {
  data: any;
  token: any;
  phone: string;
  email: string;
  password: string
}

export interface CustomerState {
  customers: Customer[];
  selectedCustomer: Customer | null;
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  customers: [],
  selectedCustomer: null,
  loading: false,
  error: null,
};

export const fetchCustomerAsync = createAsyncThunk(
  'customer/fetchCustomer',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const orders = await fetchCustomer();
      return orders;
    } catch (error) {
      throw error;
    }
  });

export const createCustomerAsync = createAsyncThunk(
  'customer/createCustomer',
  async (newCustomer: Omit<Customer, 'id'>) => {
    try {

      const createdCustomer = await createCustomerAPI(newCustomer);
      console.log("create order slice", createdCustomer);
      return createdCustomer;
    } catch (error) {
      throw error;
    }
  });

export const updateCustomerAsync = createAsyncThunk(
  'customer/updateCustomer',
  async (updatedCustomer: Customer) => {
    try {
      const updated = await updateCustomerAPI(updatedCustomer);
      console.log("updated order slice", updated);
      return updated;
    } catch (error) {
      throw error;
    }
  });

export const deleteCustomerAsync = createAsyncThunk(
  'customer/deleteCustomer', async (customerId: number) => {
    try {
      await deleteCustomerAPI(customerId);
      return customerId;
    } catch (error) {
      throw error;
    }
  });

const customersSlice = createSlice({
  name: 'customers', 
  initialState,
  reducers: {

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setOrder: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
    },
    setSelectedOrder: (state, action: PayloadAction<Customer | null>) => {
      state.selectedCustomer = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'An error occurred.';
      })
      .addCase(createCustomerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCustomerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.customers.push(action.payload);
      })
      .addCase(createCustomerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'An error occurred.';
      })
      .addCase(updateCustomerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCustomerAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCustomer = action.payload;
        const index = state.customers.findIndex(
          (customer) => customer.id === updatedCustomer.id
        );
        if (index !== -1) {
          state.customers[index] = updatedCustomer;
        }
      })
      .addCase(updateCustomerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'An error occurred.';
      })
      .addCase(deleteCustomerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        const customerId = action.payload;
        state.customers = state.customers.filter(
          (customer) => customer.id !== customerId
        );
      })
      .addCase(deleteOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'An error occurred.';
      });
  },
});

export const {
  setError, setOrder, setLoading
} = customersSlice.actions;
export const selectAllCustomer = (state: RootState) => state.customer.customers;
export default customersSlice.reducer;
export const selectCustomerById = (id: number) =>
  createSelector(
    selectAllCustomer, customer => customer.find(customer => customer.id === id) || null
  );