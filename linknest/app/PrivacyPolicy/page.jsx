import React from 'react'

const page = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white backdrop-blur-md">
    <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
    <p className="text-sm text-gray-600">Effective Date: 22/01/2025</p>

    <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
    <ul className="list-disc ml-6">
      <li><strong>Account Information:</strong> Name, email address, and profile details.</li>
      <li><strong>Usage Data:</strong> Information about your interaction with our platform.</li>
      <li><strong>Cookies:</strong> To enhance user experience and track website activity.</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
    <ul className="list-disc ml-6">
      <li>To provide and improve our services</li>
      <li>To communicate updates and offers</li>
      <li>To ensure the security and integrity of the platform</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6 mb-2">3. How We Share Your Information</h2>
    <p>We do not sell or share your personal information with third parties except:</p>
    <ul className="list-disc ml-6">
      <li>To comply with legal obligations</li>
      <li>With service providers who assist in delivering our services</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6 mb-2">4. Your Choices</h2>
    <ul className="list-disc ml-6">
      <li>You can update or delete your account at any time.</li>
      <li>Opt out of marketing communications through the link provided in emails.</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6 mb-2">5. Data Security</h2>
    <p>We take appropriate measures to protect your data but cannot guarantee complete security.</p>

    <h2 className="text-xl font-semibold mt-6 mb-2">6. Children's Privacy</h2>
    <p>We do not knowingly collect data from users under 13 without parental consent.</p>

    <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to This Policy</h2>
    <p>We may update this policy periodically. Changes will be posted on this page with a new effective date.</p>

    <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact Us</h2>
    <p>If you have any questions or concerns about this policy, please contact us at <a href="mailto:gprabal000@gmail.com" className="text-blue-500 underline">gprabal000@gmail.com</a>.</p>
  </div>
  )
}

export default page
