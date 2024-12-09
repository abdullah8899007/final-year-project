import { NextApiRequest, NextApiResponse } from 'next';

const handleCors = (req: NextApiRequest, res: NextApiResponse) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400'); 


  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
};

export default handleCors;
