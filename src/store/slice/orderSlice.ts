import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit';
import {createOrderAPI,updateOrderAPI,deleteOrderAPI,fetchOrder} from '@/api/order-api';
import axios from 'axios';
import { API_URLS } from '@/utils/api-urls'
import { RootState } from '../root-store';
export interface Items{
  itemId: number;
  stock: number;
} 
export interface Order {
  id :  number;
  customerId: number;
  items:Items[];
  orderType: string; 
  created_at: string;
  total: number;
  status: string; 
  deals? :string;
}

interface OrderState {
  orders: Order[];
  items: { itemId: number; stock: number }[];
  deals: { dealId: number; stock: number }[];
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  items: [],
  selectedOrder: null,
  loading: false,
  error: null,
  deals: []
};
export const fetchOrdersAsync = createAsyncThunk(
  'orders/fetchOrders', 
 async (_, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));
    const orders = await fetchOrder();
    return orders;
  } catch (error) {
    throw error; 
  }
});

export const createOrderAsync = createAsyncThunk(
  'orders/createOrder', 
  async (newOrder: Omit<Order, 'id' | 'created_at'>) => {
    try {
      const createdOrder = await createOrderAPI(newOrder);
      console.log("create order slice", createdOrder);
      return createdOrder; 
    } catch (error) {
      throw error;
    }
  }
);

export const updateOrderAsync = createAsyncThunk(
  'orders/updateOrder',
   async (updatedOrder: Order) => { 
  try {
    const updated = await updateOrderAPI(updatedOrder);
    console.log("updated order slice" ,updated);
    return updated;
  } catch (error) {
    throw error;
  }
});

export const deleteOrderAsync = createAsyncThunk(
  'orders/deleteOrder', async (orderId: number) => {
  try {
    await deleteOrderAPI(orderId);
    return orderId;
  } catch (error) {
    throw error; 
  }
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setItems: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
        setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload;
    },
    setOrderStatus: (state, action: PayloadAction<{ orderId: number; status: string }>) => {
      const { orderId, status } = action.payload;
      const orderIndex = state.orders.findIndex(order => order.id === orderId);
      if (orderIndex !== -1) {
        state.orders[orderIndex].status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrdersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      })
      .addCase(createOrderAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.loading = false;
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create order';
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const orderIndex = state.orders.findIndex(order => order.id === updatedOrder.id);
        if (orderIndex !== -1) {
          state.orders[orderIndex] = updatedOrder;
        }
        state.loading = false;
      })
      .addCase(updateOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update order';
      })
      .addCase(deleteOrderAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrderAsync.fulfilled, (state, action) => {
        const orderId = action.payload;
        state.orders = state.orders.filter(order => order.id !== orderId);
        state.loading = false;
      })
      .addCase(deleteOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete order';
      });
  },



}); 

export const { setSelectedOrder,setOrderStatus,setError,setLoading,setItems} = ordersSlice.actions;
export const selectAllOrder =(state:RootState)=>state.order.orders;
export default ordersSlice.reducer;
export const selectOrderItemById=(id:number)=>
createSelector(
  selectAllOrder,order => order.find(order=>order.id===id)||null
);
export const filteredOrdersSelector = createSelector(
  selectAllOrder,
  (orders) => orders
);