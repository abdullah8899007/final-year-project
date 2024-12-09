import { NextApiRequest, NextApiResponse } from 'next';
import { MenuItem } from '@/store/slice/menuSlice';
import { createItems, updateItems, deleteItems, fetchItems } from '@/api/menu-api';
import handleCors from '@/utils/middleware/authorization';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  handleCors(req, res);

  if (req.method === 'GET') {
    try {
      const items = await fetchItems(); 
      res.status(200).json(items);
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, description, price, categoryId, image, stock } = req.body;
      const newItem: Omit<MenuItem, 'id'> = { name, description, price, categoryId, image, stock };
      const createdItem = await createItems(newItem); 
      res.status(201).json(createdItem);
    } catch (error) {
      console.error('Error creating item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'PUT') { 
    try {
      const { id, name, description, price, categoryId, image, stock } = req.body;
      const updatedItem: MenuItem = { id, name, description, price, categoryId, image, stock };
      const updatedItemResponse = await updateItems(updatedItem);
      res.status(200).json(updatedItemResponse);
    } catch (error) {
      console.error('Error updating item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const itemId: number = parseInt(req.query.id as string);
      if (isNaN(itemId)) {
        throw new Error('Invalid itemId provided');
      }
      await deleteItems(itemId);
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
