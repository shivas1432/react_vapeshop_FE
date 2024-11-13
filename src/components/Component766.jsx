import React, { useState, useEffect } from 'react';
import './Component766.css';

const Component766 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(['item1', 'item2', 'item3']);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="component-766">
      <h2>react_vapeshop_FE Component</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Component766;
