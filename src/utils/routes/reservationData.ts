
import { NextApiRequest, NextApiResponse } from 'next';
import { createReservationAsync, fetchReservationsAsync, deleteReservationAsync } from '@/store/Re-Slice/ReservationSlice';
import handleCors from '@/utils/middleware/authorization';
import { Reservation } from '../../pages/reservation/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  handleCors(req, res);
  if (req.method === 'GET') {
    try {
      const reservations = await fetchReservationsAsync();
      res.status(200).json(reservations);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const {
        customerId,
        tableId,
        name,
        email,
        phone,
        event,
        bookingDateTime,
        address
      }: Reservation = req.body;

      const newReservation: Omit<Reservation, 'id'> = {
        customerId,
        tableId,
        name,
        email,
        phone,
        event,
        bookingDateTime,
        address
      };

      const createdReservation = await createReservationAsync(newReservation);
      res.status(201).json(createdReservation);
    } catch (error) {
      console.error('Error creating reservation:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const reservationId: string = req.query.id as string;
      await deleteReservationAsync(reservationId);
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting reservation:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
