import express from 'express';
import NavbarItem from '../models/NavbarItem.js';

const router = express.Router();

// GET all navbar items
router.get('/', async (req, res) => {
  try {
    const items = await NavbarItem.find().sort({ label: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Create a new navbar item
router.post('/', async (req, res) => {
  try {
    const item = new NavbarItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Update a navbar item
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await NavbarItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Delete a navbar item
router.delete('/:id', async (req, res) => {
  try {
    await NavbarItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Navbar item deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
