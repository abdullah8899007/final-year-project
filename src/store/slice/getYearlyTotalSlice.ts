import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface SalesReports {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: SalesReports = {
  data: null,
  loading: false,
  error: null,
};
const getYearlyTotalSlice = createSlice({
  name: "getYearlyTotalSlice",
  initialState,
  reducers: {
    getYearlyTotal(state) {
      state.loading = true;
    },
    getYearlyTotalSuccess(state, action: PayloadAction<any>) {
      state.data = action.payload;
      state.loading = false;
    },
    getYearlyTotalFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { getYearlyTotal, getYearlyTotalSuccess, getYearlyTotalFailure } =
getYearlyTotalSlice.actions;

export default getYearlyTotalSlice.reducer;