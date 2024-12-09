import { NextApiRequest, NextApiResponse } from 'next';
import { fetchTablesAsync, addTableAsync, deleteTableAsync } from '@/store/Re-Slice/TableSlice';
import handleCors from '@/utils/middleware/authorization';
import {Table}from '@/pages/reservation/types'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  handleCors(req, res);

  if (req.method === 'GET') {
    try {
      const tables = await fetchTablesAsync();
      res.status(200).json(tables);
    } catch (error) {
      console.error('Error fetching tables:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { tableNumber, seatingSize, status } = req.body;
      const newTableData: Omit<Table, 'id'> = { tableNumber, seatingSize, status };
      const createdTable = await addTableAsync(newTableData);
      res.status(201).json(createdTable);
    } catch (error) {
      console.error('Error creating table:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const tableId: number = parseInt(req.query.id as string);
      await deleteTableAsync(tableId);
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting table:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
