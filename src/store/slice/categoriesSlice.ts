// import { createAsyncThunk, createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '../root-store';
// import {
//   fetchCategories, createCategory, updateCategory, deleteCategory
// } from '@/api/categories-api';

// export interface CategoryItems {
//   id: number;
//   name: string;
//   image: string;
//   count:number;
// }
// interface CategoryState {
//   itemsCategories: CategoryItems[];
//   isLoading: boolean;
//   error: string | null;
// }

// const initialState: CategoryState = {
//   itemsCategories: [],
//   isLoading: false,
//   error: null,
// }; 


// // Async thunk for fetching categories
// export const fetchCategoriesAsync = createAsyncThunk(
//   'categories/fetchCategories',
//   async (_, thunkAPI) => {
//     try {
//       thunkAPI.dispatch(setLoading(true));
//       const categories = await fetchCategories();
//       return categories;
//     } catch (error) {
//       throw error;
//     } finally {
//       thunkAPI.dispatch(setLoading(false));
//     } 
//   }
// );
 
// // Async thunk for creating category
// export const createCategoryAsync = createAsyncThunk(
//   'categories/createCategory',
//   async (newCategory: Omit<CategoryItems, 'id' | "count">, thunkAPI) => {
//     try {
//       const createdCategory = await createCategory(newCategory);
//       console.log('Created Category:', createdCategory);
//       return createdCategory;
//     } catch (error) {
//       throw error;
//     }
//   }
// );


// // Async thunk for updating category

// export const updateCategoryAsync = createAsyncThunk(
//   'categories/updateCategory',
//   async (updatedCategory: CategoryItems, thunkAPI) => {
//     try {
//       console.log('Updated Category:', updatedCategory);
//       const updatedCategoryResponse = await updateCategory(updatedCategory);
//       return updatedCategoryResponse;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// // Async thunk for deleting category
// export const deleteCategoryAsync = createAsyncThunk(
//   'categories/deleteCategory',
//   async (categoryId: number, thunkAPI) => {
//     try {
//       await deleteCategory(categoryId);
//       return categoryId;
//     } catch (error) {
//       throw error;
//     }
//   }
// );
// const categorySlice = createSlice({
//   name: 'categories',
//   initialState,
//   reducers: {
//     setLoading: (state, action: PayloadAction<boolean>) => {
//       state.isLoading = action.payload;
//     },
//     setError: (state, action: PayloadAction<string | null>) => {
//       state.error = action.payload;
//     },
//     setImage: (state, action: PayloadAction<{ categoryId: number; image: string }>) => {
//       const { categoryId, image } = action.payload;
//       const categoryIndex = state.itemsCategories.findIndex(cat => cat.id === categoryId);
//       if (categoryIndex !== -1) {
//         state.itemsCategories[categoryIndex].image = image;
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCategoriesAsync.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.itemsCategories = action.payload;
//       })
//       .addCase(fetchCategoriesAsync.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message ?? 'Error fetching categories';
//       })

//       .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.itemsCategories = Array.isArray(action.payload) ? action.payload : [];
//     })
//       .addCase(createCategoryAsync.rejected, (state, action) => {
//         state.error = action.error.message ?? 'Error creating category';
//       })
//       .addCase(updateCategoryAsync.fulfilled, (state, action) => {
//         const index = state.itemsCategories.findIndex(cat => cat.id === action.payload.id);
//         if (index !== -1) {
//           state.itemsCategories[index] = action.payload;
//         }
//       })
//       .addCase(updateCategoryAsync.rejected, (state, action) => {
//         state.error = action.error.message ?? 'Error updating category';
//       })
//       .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
//         state.itemsCategories = state.itemsCategories.filter(cat => cat.id !== action.payload);
//       })
//       .addCase(deleteCategoryAsync.rejected, (state, action) => {
//         state.error = action.error.message ?? 'Error deleting category';
//       });
//   },

// });

// export const { setLoading, setError, setImage } = categorySlice.actions;

// export default categorySlice.reducer;

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
            const response = await fetch("/api/categories", {
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
