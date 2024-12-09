import { combineReducers, configureStore } from '@reduxjs/toolkit';
import menuReducer from '../store/slice/menuSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import categoriesReducer from './slice/categoriesSlice';
import cartReducer from './slice/cartSlice';
import orderReducer from './slice/orderSlice';
import customerReducer from './slice/customerSlice';
import dealReducer from './slice/dealSlice';
import invoiceReducer from '@/store/slice/invoiceSlice';
import reservationReducer from '@/store/Re-Slice/ReservationSlice';
import tableReducer from '@/store/Re-Slice/TableSlice';
// import reservedCustomerList from '@/store/Re-Slice/Re-CustomerSlice'
import salesReportReducer from "../store/slice/salesReport"
const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  menu: menuReducer,
  categories: categoriesReducer,                
  cart: cartReducer,
  order: orderReducer,
  customer: customerReducer,
  invoice: invoiceReducer,
  reservation: reservationReducer, 
  table:tableReducer,
  deal:dealReducer,
  
  sales:salesReportReducer

})
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
