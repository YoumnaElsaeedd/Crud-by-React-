import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');
  const [packedItems, setPackedItems] = useState(0);
  const [sortBy, setSortBy] = useState("inputOrder");

  const addItem = () => {
    if (description.trim() !== '') {
      setItems([...items, { quantity, description, packed: false }]);
      setDescription('');
      setQuantity(1);
    }
  };

  const removeItem = (index) => {
    if (items[index].packed) {
      setPackedItems(packedItems - 1);
    }
    setItems(items.filter((item, i) => i !== index));
  };
  
  const togglePacked = (index) => {
    const updatedItems = [...items];
    updatedItems[index].packed = !updatedItems[index].packed;
    setItems(updatedItems);
    setPackedItems(updatedItems[index].packed ? packedItems + 1 : packedItems - 1);
  };

  const handleClearList = () => {
    if (window.confirm("Are you sure you want to clear the list?")) {
      setItems([]);
      setPackedItems(0);
    }
  };

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "quantity") {
      return b.quantity - a.quantity; 
    } else if (sortBy === "description") {
      return a.description.localeCompare(b.description); 
    }
    return 0; 
  });

  const getFooterMessage = () => {
    if (items.length === 0) {
      return "Start adding some items to your packing list 🚀";
    } else if (packedItems === items.length) {
      return "You got everything! Ready to go ✈️";
    } else {
      const percentage = Math.round((packedItems / items.length) * 100);
      return `👜 You have ${items.length} item(s) on your list, and you already packed ${packedItems} (${percentage}%)`;
    }
  };

  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <h1>🏝️</h1>
          <h1>FAR AWAY</h1>
          <h1>🧳</h1>
        </div>
      </header>

      <section className="input-section">
        <h2>What do you need for your 😍 trip?</h2>
        <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
          {[...Array(20).keys()].map((i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addItem}>ADD</button>
      </section>

      <section className="list-section">
        {sortedItems.map((item, index) => (
          <div key={index} className="list-item">
            <input 
              type="checkbox" 
              checked={item.packed} 
              onChange={() => togglePacked(index)} 
            />
            <span>{item.quantity} {item.description}</span>
            <button onClick={() => removeItem(index)}>❌</button>
          </div>
        ))}
      </section>

      <section className="controls">
      
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="inputOrder">Sort by Input Order</option>
          <option value="quantity">Sort by Quantity</option>
          <option value="description">Sort by Description</option>
        </select>
        <button onClick={handleClearList} className="clear-button">
          CLEAR LIST
        </button>
      </section>

      <footer className="footer">
        <p>{getFooterMessage()}</p>
      </footer>
    </div>
  );
}

export default App;





