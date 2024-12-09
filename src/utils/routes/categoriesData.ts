import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { CategoryItems } from '@/store/slice/categoriesSlice';
 
export default function handler(req: NextApiRequest, res: NextApiResponse) 
{

  try {
    const { data } = req.body as { data: CategoryItems[] }; 
    const dataAsString = JSON.stringify(data);
    const filePath = '@/api/data.ts';
    fs.writeFileSync(filePath, `export const menuCategories : CategoryItems[] = ${dataAsString};`, 'utf-8');

    console.log('Data saved to data.ts file successfully'); 
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving data:', error); 
    res.status(500).json({ error: 'Internal Server Error' });
   
    
  }
}  


// pages/api/categories.js

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Set CORS headers to allow requests from localhost:3000
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Mock data for testing
    const category = {
      id: 1,
      name: req.body.name,
      image: req.body.image
    };



    res.status(201).json(category); 
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { CategoryItems } from '@/store/slice/categoriesSlice';
 
// export default function handler(req: NextApiRequest, res: NextApiResponse) 
{
  try {
    const { data } = req.body as { data: CategoryItems[] }; 
    const dataAsString = JSON.stringify(data);
    const filePath = '@/api/data.ts';
    fs.writeFileSync(filePath, `export const menuCategories : CategoryItems[] = ${dataAsString};`, 'utf-8');

    console.log('Data saved to data.ts file successfully'); 
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving data:', error); 
    res.status(500).json({ error: 'Internal Server Error' });
   
    
  }
}  


// pages/api/categories.js

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Set CORS headers to allow requests from localhost:3000
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Mock data for testing
    const category = {
      id: 1,
      name: req.body.name,
      image: req.body.image
    };



    res.status(201).json(category); 
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

