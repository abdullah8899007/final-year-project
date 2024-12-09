// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import {
//   createTableApi,
//   fetchTablesApi,
//   deleteTableApi,
// } from "@/api/table-api";

// export interface Table {
//   id: number;
//   table_number: number;
//   sitting_size: number;
//   status: string;
// }

// interface TableState {
//   tables: Table[];
//   error: string | null;
//   showModal: boolean;
// }

// const initialState: TableState = {
//   tables: [], 
//   error: null,
//   showModal: false,
// };


// export const addTableAsync = createAsyncThunk(
//   "table/addTable",
//   async (tableData: Omit<Table, 'id'>) => { 
//     try {
//       const createdTable = await createTableApi(tableData);
//       return createdTable;
//     } catch (error) {
//       throw new Error("Failed to add table");
//     }
//   }
// );
// // export const addTableAsync = createAsyncThunk(
// //   "table/addTable",
// //   async (tableData: Partial<Table>) => {
// //     try {
// //       if (!tableData.table_number || !tableData.sitting_size) {
// //         throw new Error('table_number and seating_size are required fields');
// //       }

// //       const createdTable = await createTableApi(tableData);
// //       return createdTable;
// //     } catch (error) {
// //       throw new Error("Failed to add table");
// //     }
// //   }
// // );


// export const fetchTablesAsync = createAsyncThunk(
//   "table/fetchTables",
//   async () => {
//     const tables = await fetchTablesApi();
//     return tables;
//   }
// );

// export const deleteTableAsync = createAsyncThunk(
//   "table/deleteTable",
//   async (tableId: number) => {
//     await deleteTableApi(tableId.toString());
//     return tableId;
//   }
// );

// const tableSlice = createSlice({
//   name: "table",
//   initialState,
//   reducers: {
//     setTables(state, action: PayloadAction<Table[]>) {
//       state.tables = action.payload;
//     },
//     removeTable(state, action: PayloadAction<number>) {
//       state.tables = state.tables.filter(
//         (table) => table.id !== action.payload
//       );
//     },
//     closeModal(state) {
//       state.showModal = false;
//     },
//   },
//   extraReducers: (builder) => {
//     (builder.
//       addCase(addTableAsync.fulfilled, (state, action: PayloadAction<Table>) => {
//       (state.tables as Table[]).push(action.payload);
//     }))
    
//       .addCase(
//         fetchTablesAsync.fulfilled,
//         (state, action: PayloadAction<Table[]>) => {
//           state.tables = action.payload;
//         }
//       )
//       .addCase(
//         deleteTableAsync.fulfilled,
//         (state, action: PayloadAction<number>) => {
//           state.tables = state.tables.filter(
//             (table) => table.id !== action.payload
//           );
//         }
//       )
//       .addMatcher(
//         (action) =>
//           action.type.endsWith("/pending") || action.type.endsWith("/rejected"),
//         (state) => {
//           state.error = "An error occurred";
//         }
//       );
//   },
// });

// export const { setTables, removeTable, closeModal } = tableSlice.actions;
// export default tableSlice.reducer;
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  createTableApi,
  fetchTablesApi,
  deleteTableApi,
} from "@/api/table-api";

export interface Table {
  id: number;
  table_number: number;
  sitting_size: number;
  status: string;
}

interface TableState {
  tables: Table[];
  error: string | null;
  showModal: boolean;
}

const initialState: TableState = {
  tables: [],
  error: null,
  showModal: false,
};

export const addTableAsync = createAsyncThunk(
  "table/addTable",
  async (tableData: Omit<Table, 'id'>) => {
    try {
      const createdTable = await createTableApi(tableData);
      return createdTable;
    } catch (error) {
      throw new Error("Failed to add table");
    }
  }
);

export const fetchTablesAsync = createAsyncThunk(
  "table/fetchTables",
  async () => {
    const tables = await fetchTablesApi();
    return tables;
  }
);

export const deleteTableAsync = createAsyncThunk(
  "table/deleteTable",
  async (tableId: number) => {
    await deleteTableApi(tableId.toString());
    return tableId;
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTables(state, action: PayloadAction<Table[]>) {
      state.tables = action.payload;
    },
    removeTable(state, action: PayloadAction<number>) {
      state.tables = state.tables.filter(
        (table) => table.id !== action.payload
      );
    },
    closeModal(state) {
      state.showModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTableAsync.fulfilled, (state, action: PayloadAction<Table>) => {
        state.tables.push(action.payload);
      })
      .addCase(
        fetchTablesAsync.fulfilled,
        (state, action: PayloadAction<Table[]>) => {
          state.tables = action.payload;
        }
      )
      .addCase(
        deleteTableAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.tables = state.tables.filter(
            (table) => table.id !== action.payload
          );
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith("/pending") || action.type.endsWith("/rejected"),
        (state) => {
          state.error = "An error occurred";
        }
      );
  },
});

export const { setTables, removeTable, closeModal } = tableSlice.actions;
export default tableSlice.reducer;
