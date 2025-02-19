import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
      <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the AttaLao website ("Service").</p>

      <h2 className="text-xl font-bold mt-4">Acceptance of Terms</h2>
      <p>By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>

      <h2 className="text-xl font-bold mt-4">Use License</h2>
      <p>Permission is granted to temporarily download one copy of the materials (information or software) on AttaLao's site for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
      <ul className="list-disc ml-6">
        <li>Modify or copy the materials;</li>
        <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
      </ul>

      <h2 className="text-xl font-bold mt-4">Disclaimer</h2>
      <p>The materials on AttaLao's site are provided on an 'as is' basis. AttaLao makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

      <h2 className="text-xl font-bold mt-4">Changes to Terms</h2>
      <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
    </div>
  );
};

export default TermsOfService;