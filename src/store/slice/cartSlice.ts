import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/root-store';
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  stock: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, name, price, image, category } = action.payload;

      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.stock += 1;
      } else {
        state.items.push({
          id,
          name,
          price,
          image,
          category,
          stock: 1,
        });
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; stock: number }>) => {
      const { id, stock } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        const updatedItem = { ...state.items[itemIndex], stock };

        if (updatedItem.stock <= 0) {
          state.items.splice(itemIndex, 1);
        } else {
          state.items[itemIndex] = updatedItem;
        }
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

  },

});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
export const selectCartItems = (state: RootState) => state.cart.items;

export const selectTotalCartItems = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + item.stock, 0)
);

export const selectAllCartItems = createSelector(
  (state: RootState) => state.cart.items,
  (items) => items
);