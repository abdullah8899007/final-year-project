import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/root-store';
import { Customer } from '@/store/slice/customerSlice';
import { Items } from '@/store/slice/orderSlice';
import {fetchInvoice,createInvoiceAPI,updateInvoiceAPI,deleteInvoiceAPI}from '@/api/invoice-api';

export interface Invoice {
  invoice_id: number;
  orderId: number;
  issued_at: string;
  customer: number;
  items: Items[]; 
}
 
interface InvoiceState {
  invoices: Invoice[];
  loading: boolean;
  error: string | null;
  selectedInvoice: Invoice | null;
}

const initialState: InvoiceState = {
  invoices: [],
  loading: false,
  selectedInvoice: null,
  error: null,
};


export const fetchInvoiceAsync = createAsyncThunk(
  'Invoice/fetchInvoice', 
 async (_, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));
    const invoice = await fetchInvoice();
    return invoice;
  } catch (error) {
    throw error;
  }
});

export const createInvoiceAsync = createAsyncThunk(
  'orders/createInvoice', 
  async (newInvoice: Omit<Invoice, 'invoice_id' |'issued_at'>) => {
  try {

    const createdInvoice = await createInvoiceAPI(newInvoice); 
    console.log("create order slice" ,createdInvoice);
    return createdInvoice; 
  } catch (error) {
    throw error;
  }
});

export const updateInvoiceAsync = createAsyncThunk(
  'invoice/updateInvoice',
   async (updatedInvoice: Invoice) => { 
  try {
    const updated = await updateInvoiceAPI(updatedInvoice);
    console.log("updated Invoice slice" ,updated);
    return updated;
  } catch (error) {
    throw error;
  }
});

export const deleteInvoiceAsync = createAsyncThunk(
  'invoice/deleteInvoice', async (invoiceId: number) => {
  try {
    await deleteInvoiceAPI(invoiceId);
    return invoiceId;
  } catch (error) {
    throw error;
  }
});

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setList: (state, action: PayloadAction<Invoice[]>) => {
      state.invoices = action.payload;
    },
    setSelectedOrder: (state, action: PayloadAction<Invoice | null>) => {
      state.selectedInvoice = action.payload;
    },
    addInvoice: (state, action: PayloadAction<Invoice>) => {
      state.invoices.push(action.payload);
    },
    updateInvoice: (state, action: PayloadAction<Invoice>) => {
      const index = state.invoices.findIndex((invoice) => invoice.invoice_id === action.payload.invoice_id);
      if (index !== -1) {
        state.invoices[index] = action.payload;
      }
    },
    removeInvoice: (state, action: PayloadAction<number>) => {
      state.invoices = state.invoices.filter((invoice) => invoice.invoice_id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoiceAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoiceAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload;
      })
      .addCase(fetchInvoiceAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch invoices';
      })
      .addCase(createInvoiceAsync.fulfilled, (state, action) => {
        state.invoices.push(action.payload);
      })
      .addCase(createInvoiceAsync.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to create invoice';
      })
      .addCase(updateInvoiceAsync.fulfilled, (state, action) => {
        const index = state.invoices.findIndex((invoice) => invoice.invoice_id === action.payload.invoice_id);
        if (index !== -1) {
          state.invoices[index] = action.payload;
        }
      })
      .addCase(updateInvoiceAsync.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to update invoice';
      })
      .addCase(deleteInvoiceAsync.fulfilled, (state, action) => {
        state.invoices = state.invoices.filter((invoice) => invoice.invoice_id !== action.payload);
      })
      .addCase(deleteInvoiceAsync.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to delete invoice';
      });
  },
});

export const {
  setError,setList,setLoading,setSelectedOrder,addInvoice,updateInvoice,removeInvoice
  
} = invoiceSlice.actions;

export const selectInvoices = (state: RootState) => state.invoice.invoices;

export const selectInvoiceById = (state: RootState, orderId: number) =>
  state.invoice.invoices.find((invoice) => invoice.orderId === orderId);

export default invoiceSlice.reducer;
