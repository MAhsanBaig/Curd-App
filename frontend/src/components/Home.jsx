import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  // Fetch all items from the database
  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:2000/home/api/curd');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // Add a new item
  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:2000/home/api/curd', {
        curd: input,
      });
      console.log('Added:', response.data);
      setInput(''); // Clear the input field
      fetchItems(); // Refresh the list after adding
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // Delete all items
  const handleDeleteAll = async () => {
    try {
      const response = await axios.delete('http://localhost:2000/home/api/curd');
      console.log('All items deleted:', response.data);
      fetchItems(); // Refresh the list after deleting all
    } catch (error) {
      console.error('Error deleting all items:', error);
    }
  };

  const editHandler = async (id) => {
    if (!input) return; // Prevent editing with an empty input

    try {
      const response = await axios.put(`http://localhost:2000/home/api/curd/${id}`, {
        curd: input,
      });
      console.log('Edited:', response.data);
      setInput(''); // Clear the input field after editing
      setEditingId(null); // Reset editing state
      fetchItems(); // Refresh the list after editing
    } catch (error) {
      console.error('Error editing item:', error);
    }
  };

  // Delete an item
  const deleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/home/api/curd/${id}`);
      console.log('Deleted item with ID:', id);
      fetchItems(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };


  return (
    <div>
      <div className='flex justify-center mt-32 gap-3'>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-1/2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className='flex gap-3'>
          <button className="btn btn-info" onClick={handleAdd}>ADD</button>
          <button className="btn btn-error" onClick={handleDeleteAll}>DELETE ALL</button>
        </div>
      </div>

      {/* Displaying the list of items */}
      <div>
      <div className='flex flex-col  mt-10 gap-10'>
        {items.map((post) => {
          return (
            <div key={post._id} className='flex justify-center  gap-3'>
              <input
                type="text"
                className="input input-bordered w-1/2"
                value={editingId === post._id ? input : post.curd} // Show input value when editing
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setEditingId(post._id)} // Set the item ID when focused
              />
              <button
                className="btn btn-info"
                onClick={() => editHandler(post._id)}
                disabled={!input || editingId !== post._id} // Disable if input is empty or not editing this item
              >
                EDIT
              </button>
              <button
                className="btn btn-error"
                onClick={() => deleteHandler(post._id)}
              >
                DELETE
              </button>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
};

export default Home;
