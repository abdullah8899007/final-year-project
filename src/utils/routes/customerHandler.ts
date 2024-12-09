import { NextApiRequest, NextApiResponse } from 'next';
import handleCors from '@/utils/middleware/authorization';
import { fetchCustomer, createCustomerAPI, updateCustomerAPI, deleteCustomerAPI } from '@/api/customer-api';
import { Customer } from '@/store/slice/customerSlice';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  handleCors(req, res);
  if (req.method === 'GET') {
    try {

      const customer = await fetchCustomer();
      res.status(200).json(customer);
    } catch (error) {
      console.error('Error fetching Customer:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {

      const { name, email, address, phone }: { name: string, email: string, address: string, phone: string } = req.body;
      const newCustomer: Omit<Customer, 'id'> = { name, email, address, phone };
      const createdCustomer = await createCustomerAPI(newCustomer);
      res.status(201).json(createdCustomer);
    } catch (error) {
      console.error('Error creating Customer:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id, name, email, address, phone }: Customer = req.body;
      const updatedCustomer: Omit<Customer, 'count'> = { id, name, email, address, phone };
      const updatedCustomerResponse = await updateCustomerAPI(updatedCustomer);
      res.status(200).json(updatedCustomerResponse);
    } catch (error) {
      console.error('Error updating customer:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const customerId: number = parseInt(req.query.id as string);
      if (isNaN(customerId)) {
        throw new Error('Invalid customerId provided');
      }
      await deleteCustomerAPI(customerId);
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting customerId:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {

    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
