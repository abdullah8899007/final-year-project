import { NextApiRequest, NextApiResponse } from 'next';
import { createOrderAPI, updateOrderAPI, deleteOrderAPI, fetchOrder } from '@/api/order-api';
import handleCors from '@/utils/middleware/authorization';
import { Order } from '@/store/slice/orderSlice';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  handleCors(req, res);

  if (req.method === 'GET') {
    try {
      const items = await fetchOrder(); 
      res.status(200).json(items);
    } catch (error) {
      console.error('Error fetching items:', error); 
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }else if (req.method === 'POST') {
    try {
      const { customerId, orderType, total, status, items } = req.body;
      const newOrder: Omit<Order, 'id' | 'created_at'> = { customerId, items, orderType, total, status };
      const createdOrder = await createOrderAPI(newOrder);
      console.log("craete Order in handler",createdOrder);
      res.status(201).json(createdOrder);
    } catch (error) {
      console.error('Error creating item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  
  
  } else if (req.method === 'PUT' || req.method === 'PATCH') { 
    try {
      const { id, name, customerId, items, orderType, created_at, total, status } = req.body;
      const updatedOrder = { id, name, customerId, items, orderType, created_at, total, status };
      const updatedItemResponse = await updateOrderAPI(updatedOrder);
      res.status(200).json(updatedItemResponse);
    } catch (error) {
      console.error('Error updating item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const orderId = parseInt(req.query.id as string);
      await deleteOrderAPI(orderId);
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting Order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE','PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
 