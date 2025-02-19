import React from 'react';

const ShippingPolicy: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shipping Policy</h1>
      <p>At AttaLao, we pride ourselves on our fast delivery service:</p>

      <h2 className="text-xl font-bold mt-4">2-Hour Delivery</h2>
      <ul className="list-disc ml-6">
        <li>We offer a 2-hour delivery service within our serviceable areas.</li>
        <li>Orders must be placed before 6 PM to qualify for same-day 2-hour delivery.</li>
        <li>A small fee applies for this expedited service.</li>
      </ul>

      <h2 className="text-xl font-bold mt-4">Service Areas</h2>
      <p>Our 2-hour delivery is currently available in Mumbai, Delhi, and Bangalore.</p>
      
      <h2 className="text-xl font-bold mt-4">Regular Shipping</h2>
      <p>For areas outside our 2-hour delivery zones, we offer standard shipping which takes 2-5 business days.</p>
    </div>
  );
};

export default ShippingPolicy;