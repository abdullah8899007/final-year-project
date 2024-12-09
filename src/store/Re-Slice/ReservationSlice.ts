// import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import { createReservationApi, fetchReservationsApi, deleteReservationApi } from "@/api/reservation-api";

// export interface Reservation {
//   id: number;
//   customerId: number;
//   tableId: number;
//   status?: string;
//   booking_time: string;
// }

// export interface ReservationState {
//   reservations: Reservation[];
//   loading: boolean;
//   error: string | null;
// }
// export const createReservationAsync = createAsyncThunk(
//   'reservation/createReservation',
//   async (newReservation: Omit<Reservation, 'id'>, thunkAPI) => {
//     try {
//       const createReservation = await createReservationApi(newReservation);
//       console.log('Created Reservation:', createReservation);
//       return newReservation;
//     } catch (error) { 
//       throw error;
//     }
//   }
// );


// // export const createReservationAsync = createAsyncThunk(
// //   'reservation/createReservation',
// //   async (newReservation: Omit<Reservation, 'id'>, thunkAPI) => {
// //     try {
// //       const createReservation = await createReservationApi(newReservation);
// //       console.log('Created Category:', createReservation);
// //       return newReservation;
// //     } catch (error) { 
// //       throw error;
// //     }
// //   }
// // );

// export const fetchReservationsAsync = createAsyncThunk(
//   'reservation/fetchReservations',
//   async () => {
//     try {
//       const reservations = await fetchReservationsApi();
//       return reservations;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// export const deleteReservationAsync = createAsyncThunk(
//   'reservation/deleteReservation',
//   async (reservationId: number) => {
//     try {
//       await deleteReservationApi(reservationId.toString());
//       return reservationId;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// const initialState: ReservationState = {
//   reservations: [],
//   loading: false,
//   error: null,
// };

// const ReservationSlice = createSlice({
//   name: "reservation",
//   initialState,
//   reducers: {
//     clearFormData(state) {
//       state.reservations = initialState.reservations;
//     },
//     setError(state, action: PayloadAction<string>) {
//       state.error = action.payload;
//     },
//     clearError(state) {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchReservationsAsync.fulfilled, (state, action) => {
//         state.loading = false;
//         state.reservations = action.payload;
//       })
//       // .addCase(createReservationAsync.fulfilled, (state, action) => {
//       //   state.loading = false;
//       //   state.reservations.push(action.payload);
//       // })
//       .addCase(createReservationAsync.fulfilled, (state, action: PayloadAction<Omit<Reservation, 'id'>>) => {
//         state.loading = false;
//         state.reservations.push({ ...action.payload, id: state.reservations.length + 1 })
//       })
//       .addCase(deleteReservationAsync.fulfilled, (state, action) => {
//         state.loading = false;
//         const reservationIdToDelete = action.payload;
//         state.reservations = state.reservations.filter(reservation => reservation.id !== reservationIdToDelete);
//       })
//       .addMatcher(
//         action => action.type.endsWith('/pending') || action.type.endsWith('/rejected'),
//         (state) => {
//           state.loading = true;
//         }
//       )
//       .addMatcher(
//         action => action.type.endsWith('/fulfilled'),
//         (state) => {
//           state.loading = false;
//         }
//       );
//   },
// });

// export const { clearFormData, setError, clearError } = ReservationSlice.actions;
// export default ReservationSlice.reducer;
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createReservationApi, fetchReservationsApi, deleteReservationApi } from "@/api/reservation-api";

export interface Reservation {
  id: number;
  customerId: number;
  tableId: number;
  status?: string;
  booking_time: string;
}

export interface ReservationState {
  reservations: Reservation[];
  loading: boolean;
  error: string | null;
}

export const createReservationAsync = createAsyncThunk(
  'reservation/createReservation',
  async (newReservation: Omit<Reservation, 'id'>, thunkAPI) => {
    try {
      const createReservation = await createReservationApi(newReservation);
      console.log('Created Reservation:', createReservation);
      return newReservation;
    } catch (error) { 
      throw error;
    }
  }
);

export const fetchReservationsAsync = createAsyncThunk(
  'reservation/fetchReservations',
  async () => {
    try {
      const reservations = await fetchReservationsApi();
      return reservations;
    } catch (error) {
      throw error;
    }
  }
);
// export const createCustomerAsync = createAsyncThunk(
//   'customer/createCustomer',
//   async (newCustomer: Omit<Customer, 'id'>, thunkAPI) => {
//     try {
//       const createdCustomer = await createCustomerApi(newCustomer);
//       console.log('Created Customer:', createdCustomer);
//       return createdCustomer;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

export const deleteReservationAsync = createAsyncThunk(
  'reservation/deleteReservation',
  async (reservationId: number) => {
    try {
      await deleteReservationApi(reservationId.toString());
      return reservationId;
    } catch (error) {
      throw error;
    }
  }
);

const initialState: ReservationState = {
  reservations: [],
  loading: false,
  error: null,
};

const ReservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    clearFormData(state) {
      state.reservations = initialState.reservations;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservationsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload;
      })
      .addCase(createReservationAsync.fulfilled, (state, action: PayloadAction<Omit<Reservation, 'id'>>) => {
        state.loading = false;
        // Generate a unique id for the new reservation
        const newId = state.reservations.length > 0 ? Math.max(...state.reservations.map(reservation => reservation.id)) + 1 : 1;
        state.reservations.push({ ...action.payload, id: newId });
      })
      .addCase(deleteReservationAsync.fulfilled, (state, action) => {
        state.loading = false;
        const reservationIdToDelete = action.payload;
        state.reservations = state.reservations.filter(reservation => reservation.id !== reservationIdToDelete);
      })
      .addMatcher(
        action => action.type.endsWith('/pending') || action.type.endsWith('/rejected'),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { clearFormData, setError, clearError } = ReservationSlice.actions;
export default ReservationSlice.reducer;
