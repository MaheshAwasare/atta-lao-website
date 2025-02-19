import React from 'react';

const RefundPolicy: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Refund Policy</h1>
      <p>At AttaLao, we aim for 100% customer satisfaction. Here is our policy for returns and refunds:</p>

      <h2 className="text-xl font-bold mt-4">Returns</h2>
      <ul className="list-disc ml-6">
        <li>You can return items within 14 days of receipt.</li>
        <li>Items must be unopened and in original packaging.</li>
      </ul>

      <h2 className="text-xl font-bold mt-4">Refunds</h2>
      <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
      <ul className="list-disc ml-6">
        <li>Refunds are processed within 30 days after approval.</li>
        <li>We issue refunds to the original method of payment.</li>
      </ul>
    </div>
  );
};

export default RefundPolicy;