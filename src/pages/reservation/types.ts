// types.ts
export interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  tableId: number;
  booking_time: string;
  status: string;
  image: string;
}

export interface Table {
  id: number;
  table_number: number;
  sitting_size: number;
  status: string;
}

export interface Reservation {
  event: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  id: number;
  customerId: number;
  tableId: number;
  status?: string;
  booking_time: string;
}
