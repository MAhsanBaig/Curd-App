// server.js
import Curd from '../models/curdModel.js'; // Assuming the Curd model is in models/Curd.js

// CREATE - Add a new curd item
export const Add= async (req, res) => {
  try {
    const { curd } = req.body;

    const newCurd = new Curd({ curd });
    await newCurd.save();

    res.status(201).json({
      message: 'Curd item created successfully',
      id: newCurd._id,
      curd: newCurd.curd,
    });
  } catch (error) {
    console.log('Error in creating curd', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// READ - Get all curd items
export const Read=async (req, res) => {
  try {
    const curds = await Curd.find();
    res.status(200).json(curds);
  } catch (error) {
    console.log('Error in getting curd items', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// READ - Get a specific curd item by ID
// app.get('/api/curd/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const curd = await Curd.findById(id);

//     if (!curd) {
//       return res.status(404).json({ error: 'Curd item not found' });
//     }

//     res.status(200).json(curd);
//   } catch (error) {
//     console.log('Error in getting curd item', error.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// UPDATE - Edit a curd item
export const Edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { curd } = req.body;

    const updatedCurd = await Curd.findByIdAndUpdate(id, { curd }, { new: true });

    if (!updatedCurd) {
      return res.status(404).json({ error: 'Curd item not found' });
    }

    res.status(200).json({
      message: 'Curd item updated successfully',
      id: updatedCurd._id,
      curd: updatedCurd.curd,
    });
  } catch (error) {
    console.log('Error in updating curd item', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}
// DELETE - Delete a curd item
export const Delete = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCurd = await Curd.findByIdAndDelete(id);

    if (!deletedCurd) {
      return res.status(404).json({ error: 'Curd item not found' });
    }

    res.status(200).json({ message: 'Curd item deleted successfully' });
  } catch (error) {
    console.log('Error in deleting curd item', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// DELETE ALL - Delete all curd items
export const Deleteall= async (req, res) => {
  try {
    await Curd.deleteMany({});
    res.status(200).json({ message: 'All curd items deleted successfully' });
  } catch (error) {
    console.log('Error in deleting all curd items', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}
