import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import {Customer} from '@/store/slice/customerSlice';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data } = req.body as { data: Customer[] };
    const dataAsString = JSON.stringify(data);
    const filePath = '@/api/data.ts';
    fs.writeFileSync(filePath, `export const customerinf: CustomerInfo[] = ${dataAsString};`, 'utf-8');
    console.log('Data saved to data.ts file successfully');
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}  
     