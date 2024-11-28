import React from 'react';
import Payment from './payment';

const ParentComponent = () => {
  const totalPrice = 123.45; // Example total price, you can dynamically calculate or fetch this

  return <Payment totalPrice={totalPrice} />;
};

export default ParentComponent;
