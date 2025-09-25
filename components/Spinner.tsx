import React from 'react';
import { Globe } from 'lucide-react';

const Spinner = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
    <div className="animate-spin rounded-full h-16 w-16 flex items-center justify-center border-4 border-blue-600 border-t-transparent">
      <Globe className="w-10 h-10 text-blue-600" />
    </div>
  </div>
);

export default Spinner;
