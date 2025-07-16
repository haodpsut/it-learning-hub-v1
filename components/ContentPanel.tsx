
import React from 'react';

interface ContentPanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ContentPanel: React.FC<ContentPanelProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
      <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-700 pb-2">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default ContentPanel;
