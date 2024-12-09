import { NextApiRequest, NextApiResponse } from 'next';
import { fetchInvoiceAsync, createInvoiceAsync, updateInvoiceAsync, deleteInvoiceAsync } from '@/store/slice/invoiceSlice';
import { Invoice } from '@/store/slice/invoiceSlice';
import handleCors from '@/utils/middleware/authorization';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  handleCors(req, res);

  if (req.method === 'GET') {
    try {
      const items = await fetchInvoiceAsync(); 
      res.status(200).json(items);
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { customer, items, orderId} = req.body;
      const newInvoice: Omit<Invoice, 'id' | 'date'> = {customer,items,orderId};
      const createdInvoice = await createInvoiceAsync(newInvoice);
      res.status(201).json(createdInvoice);
    } catch (error) {
      console.error('Error creating item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'PUT') { 
    try {
      const { id, customer, items ,orderId,date}:Invoice = req.body;
      const updatedInvoice = { id, customer, items ,orderId,date };
      const updatedItemResponse = await updateInvoiceAsync(updatedInvoice);
      res.status(200).json(updatedItemResponse);
    } catch (error) {
      console.error('Error updating item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const invoiceId = parseInt(req.query.id as string);
      await deleteInvoiceAsync(invoiceId);
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting Invoice:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
