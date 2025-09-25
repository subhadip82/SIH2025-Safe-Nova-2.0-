"use client";
import React from 'react';

const AboutPage = () => (
  <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10 px-2">
    <div className="w-full max-w-3xl bg-white/90 rounded-2xl shadow-2xl p-8 md:p-12 border border-blue-100">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-blue-700 text-center drop-shadow-sm">About Safe Nova</h1>
      <p className="mb-6 text-lg md:text-xl text-gray-700 leading-relaxed text-center">
      <strong>Safe Nova</strong> is an innovative emergency preparedness and disaster response platform designed for educational institutions and communities. Our mission is to empower students, teachers, and administrators with the knowledge and tools needed to stay safe during emergencies.
    </p>
      <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-3 text-blue-600 border-l-4 border-blue-400 pl-3">Why is this app important?</h2>
      <ul className="list-disc ml-8 mb-6 text-gray-700 space-y-2">
      <li>Promotes a culture of safety and preparedness in schools and communities.</li>
      <li>Provides interactive training, real-time alerts, and personalized emergency plans.</li>
      <li>Supports government policies on disaster management and safety education.</li>
      <li>Helps reduce panic and confusion during real emergencies.</li>
      <li>Encourages family and community involvement in safety initiatives.</li>
    </ul>
      <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-3 text-blue-600 border-l-4 border-blue-400 pl-3">Government Policy & Alignment</h2>
      <p className="mb-6 text-gray-700">
      Safe Nova aligns with the National Disaster Management Authority (NDMA) guidelines and the School Safety Policy of the Government of India. The app supports:
    </p>
      <ul className="list-disc ml-8 mb-6 text-gray-700 space-y-2">
      <li>Implementation of disaster management plans in schools.</li>
      <li>Regular safety drills and awareness programs.</li>
      <li>Integration with local authorities for real-time alerts and support.</li>
      <li>Accessible resources for students, teachers, and parents.</li>
    </ul>
      <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-3 text-blue-600 border-l-4 border-blue-400 pl-3">Key Features</h2>
      <ul className="list-disc ml-8 mb-6 text-gray-700 space-y-2">
      <li>Disaster simulation games and interactive learning modules.</li>
      <li>Personalized emergency plans and AR evacuation guides.</li>
      <li>Offline mode and PWA support for uninterrupted access.</li>
      <li>Family & Friends Safety Network for coordinated response.</li>
      <li>Real-time alerts and notifications.</li>
    </ul>
      <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-3 text-blue-600 border-l-4 border-blue-400 pl-3">Contact & Support</h2>
      <p className="text-gray-700 text-center mt-4">
        For more information, policy documents, or support, please contact your institution's safety officer or visit the official NDMA website.
      </p>
    </div>
  </section>
);

export default AboutPage;
