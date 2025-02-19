import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p>At AttaLao, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

      <h2 className="text-xl font-bold mt-4">Information Collection</h2>
      <ul className="list-disc ml-6">
        <li>We collect personal information like your name, email address, and contact details when you make a purchase or sign up for our newsletter.</li>
        <li>We automatically collect data about your device and usage patterns through cookies and similar technologies.</li>
      </ul>

      <h2 className="text-xl font-bold mt-4">Use of Information</h2>
      <p>We use your information to:</p>
      <ul className="list-disc ml-6">
        <li>Process your orders and provide customer service.</li>
        <li>Send you newsletters or promotional materials if you've opted in.</li>
        <li>Improve our website's functionality and user experience.</li>
      </ul>

      <h2 className="text-xl font-bold mt-4">Sharing of Information</h2>
      <p>We do not sell, trade, or otherwise transfer your personal data to outside parties unless we provide you with advance notice.</p>

      <h2 className="text-xl font-bold mt-4">Security</h2>
      <p>We implement a variety of security measures to maintain the safety of your personal information.</p>

      <h2 className="text-xl font-bold mt-4">Changes to This Privacy Policy</h2>
      <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
    </div>
  );
};

export default PrivacyPolicy;