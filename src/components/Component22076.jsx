import React, { useState, useEffect } from 'react';

const Component22076 = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData({ id: 22076, status: 'ready' });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div>Loading Component22076...</div>;
  }

  return (
    <div className="component-22076">
      <h3>Component 22076</h3>
      <p>Status: {data.status}</p>
      <p>ID: {data.id}</p>
    </div>
  );
};

export default Component22076;
