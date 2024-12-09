import { createAsyncThunk, createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/root-store';
import { createItems,updateItems,deleteItems,fetchItems } from '@/api/menu-api';

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  image: string;
  stock: number; 
}

interface MenuState {
  items: MenuItem[];
  selectedItem: MenuItem | null;
  isLoading: boolean;
  error: string | null;
  filter: string | null;
}

const initialState: MenuState = {
  items: [],
  selectedItem: null,
  isLoading: false,
  error: null,
  filter: null,
};
// Async thunk for fetching menu items
export const fetchMenuItemsAsync = createAsyncThunk(
  'menu/fetchMenuItems',
  async (_,thunkAPI ) => {
    try { 
      thunkAPI.dispatch(setLoading(true));
      const menus= await fetchItems();
      return menus;
    } catch (error) {
      throw error;
    } finally {
      thunkAPI.dispatch(setLoading(false));
    } 
  }
);

// Async thunk for creating a menu item
export const createMenuItemAsync = createAsyncThunk(
  'menu/createMenuItem',
  async (newItem: Omit<MenuItem, 'id'>, thunkAPI) => {
    try {
      const createMenuItem = await createItems(newItem);
      console.log('Created Category:', createMenuItem);
      return createMenuItem;
    } catch (error) { 
      throw error;
    }
  }
);

// Async thunk for updating a menu item
export const updateMenuItemAsync = createAsyncThunk<MenuItem, MenuItem>(
  'menu/updateMenuItem',
  async (updateMenuItem: MenuItem, thunkAPI) => {
    try {
      const updateMenuItemresponse = await updateItems(updateMenuItem);
      return updateMenuItemresponse;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for deleting a menu item
export const deleteMenuItemAsync = createAsyncThunk(
  'menu/deleteMenuItem',
  async (itemId: number, thunkAPI) => {
    try {
      await deleteItems(itemId);
      return itemId;
    } catch (error) {
      throw error;
    }
  }
);
const menuSlice = createSlice({
  name: 'menu',
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
    setItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMenuItemsAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMenuItemsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchMenuItemsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Error fetching menu items';
      })
      .addCase(createMenuItemAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createMenuItemAsync.rejected, (state, action) => {
        state.error = action.error.message ?? 'Error creating menu Items';
      })
      .addCase(updateMenuItemAsync.fulfilled, (state, action) => {
        const updatedItemIndex = state.items.findIndex(item => item.id === action.payload.id);
        if (updatedItemIndex !== -1) {
          state.items[updatedItemIndex] = action.payload;
        }
      }) 
      .addCase(updateMenuItemAsync.rejected, (state, action) => {
        state.error = action.error.message ?? 'Error updating MenuItems';
      })
      .addCase(deleteMenuItemAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteMenuItemAsync.rejected, (state, action) => {
        state.error = action.error.message ?? 'Error deleting MenuItems';
      });

  },
});

export const { setFilter, setLoading, setError, setItems } = menuSlice.actions;
export const selectAllitems = (state: RootState) => state.menu.items;
export default menuSlice.reducer;

export const selectMenuItemById = (id: number) =>
  createSelector(
    selectAllitems,
    menuItem => menuItem.find(item => item.id === id) || null
  );
 