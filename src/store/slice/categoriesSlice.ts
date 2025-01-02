export const selectAllCategories = (state: RootState) =>
  state.categories.itemsCategories;


// export const selectCategoryById = (categoryId: number) =>
//   createSelector(
//     selectAllCategories,
//     categories => categories.find(cat => cat.id === categoryId) || null
//   );
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define CategoryItems and CategoryState types
interface CategoryItems {
    id: number;
    name: string;
    // Add any other properties your categories have
}

interface CategoryState {
    itemsCategories: CategoryItems[];
    isLoading: boolean;
    error: string | null;
}

// Initial state
const initialState: CategoryState = {
    itemsCategories: [],
    isLoading: false,
    error: null,
};

// Thunks
export const fetchCategoriesAsync = createAsyncThunk<CategoryItems[]>(
    "categories/fetchCategories",
    async (_, thunkAPI) => {
        try {
            // Replace with your actual API call
            const response = await fetch("/api/categories");
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch categories");
        }
    }
);

export const createCategoryAsync = createAsyncThunk<CategoryItems, CategoryItems>(
    "categories/createCategory",
    async (newCategory, thunkAPI) => {
        try {
            // Replace with your actual API call
            const response = await fetch("/menu/categories/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCategory),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to create category");
        }
    }
);

// Slice
const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch categories
            .addCase(fetchCategoriesAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCategoriesAsync.fulfilled, (state, action: PayloadAction<CategoryItems[]>) => {
                state.isLoading = false;
                state.itemsCategories = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchCategoriesAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Create category
            .addCase(createCategoryAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createCategoryAsync.fulfilled, (state, action: PayloadAction<CategoryItems>) => {
                state.isLoading = false;
                if (Array.isArray(state.itemsCategories)) {
                    state.itemsCategories.push(action.payload);
                }
            })
            .addCase(createCategoryAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default categoriesSlice.reducer;