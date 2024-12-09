import { NextApiRequest, NextApiResponse } from 'next';
import { CategoryItems } from '@/store/slice/categoriesSlice';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '@/api/categories-api';
import handleCors from '@/utils/middleware/authorization';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  handleCors(req, res);
  if (req.method === 'GET') {
    try {
      const categories = await fetchCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, image }: { name: string, image: string } = req.body;
      const newCategory: Omit<CategoryItems, 'id'| 'count'> = { name, image };
      const createdCategory = await createCategory(newCategory);
      res.status(201).json(createdCategory);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id, name, image }: CategoryItems = req.body;
      const updatedCategory:  Omit<CategoryItems,'count'> = { id, name, image };
      const updatedCategoryResponse = await updateCategory(updatedCategory);
      res.status(200).json(updatedCategoryResponse);
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const categoryId: number = parseInt(req.query.id as string);
      if (isNaN(categoryId)) {
        throw new Error('Invalid categoryId provided');
      }
      await deleteCategory(categoryId);
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {

    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
